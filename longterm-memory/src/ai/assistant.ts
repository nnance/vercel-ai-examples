import { actionAssigner } from "./action-assigner";
import { categoryAssigner } from "./category-assigner";
import { AgentEvent, MemoryAction } from "./interfaces";
import { chatCompletion } from "./llm";
import { extractMemory } from "./memory-extractor";
import { checkMemoryExtraction } from "./memory-reviewer";
import { sentinelCheck } from "./sentinel";

const numExtractionAttempts = 3;

export async function cookingAssistant({
  message,
  response,
  notify,
  action,
}: {
  message: string;
  response?: (response: string) => void;
  notify?: (event: AgentEvent) => void;
  action?: (action: MemoryAction) => void;
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
    return;
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
    return;
  }

  // action assigner
  const memoryActions = await actionAssigner(message)(memoryExtraction, []);
  if (notify) {
    notify({
      name: "ACTION_ASSIGNER",
      containsInformation: true,
      extractionSuccessful: true,
      actions: memoryActions,
    });
  }

  // category assigner
  const memoryCategories = await categoryAssigner(message)(memoryActions);
  if (notify) {
    notify({
      name: "CATEGORY_ASSIGNER",
      containsInformation: true,
      extractionSuccessful: true,
      actions: memoryCategories,
    });
  }

  // process memory actions
  if (action) {
    memoryCategories.forEach(action);
  }
}
