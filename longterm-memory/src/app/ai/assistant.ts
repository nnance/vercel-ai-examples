import { actionAssigner } from "./action-assigner";
import { categoryAssigner } from "./category-assigner";
import { AgentEvent, Memory } from "@/interfaces";
import { extractMemory } from "./memory-extractor";
import { checkMemoryExtraction } from "./memory-reviewer";
import { sentinelCheck } from "./sentinel";

const numExtractionAttempts = 3;

export async function* cookingAssistant({
  message,
  memories,
}: {
  message: string;
  memories: Memory[];
}): AsyncGenerator<AgentEvent> {
  // sentinal check
  const sentinalMessage = await sentinelCheck(message);
  yield {
    name: "SENTINEL",
    containsInformation: sentinalMessage.containsInformation,
    extractionSuccessful: false,
    actions: [],
  };

  if (!sentinalMessage.containsInformation) {
    return memories;
  }

  // memory extraction
  let extractionAttempts = 0;
  let extractionSuccessful = false;
  let memoryExtraction;

  while (extractionAttempts < numExtractionAttempts && !extractionSuccessful) {
    memoryExtraction = await extractMemory(message)();
    yield {
      name: "MEMORY_EXTRACTOR",
      containsInformation: true,
      extractionSuccessful: false,
      actions: memoryExtraction,
    };

    // memory review
    const memoryReview = await checkMemoryExtraction(message)(memoryExtraction);
    yield {
      name: "MEMORY_REVIEWER",
      containsInformation: true,
      extractionSuccessful: memoryReview.is_perfect,
      description: memoryReview.criticism,
      actions: [],
    };

    extractionSuccessful = memoryReview.is_perfect;
    extractionAttempts++;
  }

  if (!memoryExtraction || !extractionSuccessful) {
    return memories;
  }

  // category assigner
  const memoryCategories = await categoryAssigner(message)(memoryExtraction);
  yield {
    name: "CATEGORY_ASSIGNER",
    containsInformation: true,
    extractionSuccessful: true,
    actions: memoryCategories,
  };

  // action assigner
  const memoryActions = await actionAssigner()(memoryCategories, memories);
  yield {
    name: "ACTION_ASSIGNER",
    containsInformation: true,
    extractionSuccessful: true,
    actions: memoryActions,
  };

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

  return newMemories;
}
