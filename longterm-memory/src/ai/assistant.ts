import { actionAssigner } from "./action-assigner";
import { categoryAssigner } from "./category-assigner";
import { AgentEvent, Memory, MemoryAction } from "./interfaces";
import { chatCompletion } from "./llm";
import { extractMemory } from "./memory-extractor";
import { checkMemoryExtraction } from "./memory-reviewer";
import { sentinelCheck } from "./sentinel";

const numExtractionAttempts = 3;

export async function cookingAssistant({
  message,
  memories,
  response,
  notify,
}: {
  message: string;
  memories: Memory[];
  response?: (response: string) => void;
  notify?: (event: AgentEvent) => void;
}) {
  const llmMessage = await chatCompletion({
    text: message,
    sender: "USER",
  });
  if (response) {
    response(llmMessage.text);
  }

  // sentinal check
  const sentinalMessage = await sentinelCheck(message);
  if (notify) {
    notify({
      name: "SENTINEL",
      containsInformation: sentinalMessage.containsInformation,
      extractionSuccessful: false,
      actions: [],
    });
  }

  if (!sentinalMessage.containsInformation) {
    return memories;
  }

  // memory extraction
  let extractionAttempts = 0;
  let extractionSuccessful = false;
  let memoryExtraction;

  while (extractionAttempts < numExtractionAttempts && !extractionSuccessful) {
    memoryExtraction = await extractMemory(message)();
    if (notify) {
      notify({
        name: "MEMORY_EXTRACTOR",
        containsInformation: true,
        extractionSuccessful: false,
        actions: memoryExtraction,
      });
    }

    // memory review
    const memoryReview = await checkMemoryExtraction(message)(memoryExtraction);
    if (notify) {
      notify({
        name: "MEMORY_REVIEWER",
        containsInformation: true,
        extractionSuccessful: memoryReview.is_perfect,
        description: memoryReview.criticism,
        actions: [],
      });
    }

    extractionSuccessful = memoryReview.is_perfect;
    extractionAttempts++;
  }

  if (!memoryExtraction || !extractionSuccessful) {
    return memories;
  }

  // category assigner
  const memoryCategories = await categoryAssigner(message)(memoryExtraction);
  if (notify) {
    notify({
      name: "CATEGORY_ASSIGNER",
      containsInformation: true,
      extractionSuccessful: true,
      actions: memoryCategories,
    });
  }

  // action assigner
  const memoryActions = await actionAssigner()(memoryCategories, memories);
  if (notify) {
    notify({
      name: "ACTION_ASSIGNER",
      containsInformation: true,
      extractionSuccessful: true,
      actions: memoryActions,
    });
  }

  // process memory actions
  const newMemories = memoryActions.reduce<Memory[]>(
    (acc, { action, knowledge, category, index }) => {
      const newMemory = {
        knowledge,
        category: category!,
      };
      if (action === "CREATE") {
        return [...acc, newMemory];
      } else if (action === "UPDATE" && index !== undefined && index > -1) {
        return acc.map((m, i) => (i === index ? newMemory : m));
      } else if (action === "DELETE" && index !== undefined && index > -1) {
        return acc.filter((_, i) => i !== index);
      } else {
        return acc;
      }
    },
    memories
  );

  console.log(newMemories);

  return newMemories;
}
