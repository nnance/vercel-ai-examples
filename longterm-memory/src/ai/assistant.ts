import { actionAssigner } from "./action-assigner";
import { categoryAssigner } from "./category-assigner";
import { AgentEvent, MemoryAction } from "./interfaces";
import { chatCompletion } from "./llm";
import { extractMemory } from "./memory-extractor";
import { checkMemoryExtraction } from "./memory-reviewer";
import { sentinalCheck, SentinalResult } from "./sentinal";

const numExtractionAttempts = 3;

export function cookingAssistant({
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
  const llmMessage = chatCompletion({
    text: message,
    sender: "USER",
  });
  if (response) {
    response(llmMessage.text);
  }

  // sentinal check
  const sentinalMessage = sentinalCheck(message);
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
    memoryExtraction = extractMemory(message)(sentinalMessage);
    if (notify) {
      notify({
        name: "MEMORY_EXTRACTOR",
        containsInformation: true,
        extractionSuccessful: false,
        actions: memoryExtraction,
      });
    }

    // memory review
    const memoryReview = checkMemoryExtraction(llmMessage)(memoryExtraction);
    if (notify) {
      notify({
        name: "MEMORY_REVIEWER",
        containsInformation: true,
        extractionSuccessful: memoryReview.extractionSuccessful,
        actions: [],
      });
    }

    extractionSuccessful = memoryReview.extractionSuccessful;
    extractionAttempts++;
  }

  if (!memoryExtraction) {
    return;
  }

  // action assigner
  const memoryActions = actionAssigner(llmMessage)(memoryExtraction);
  if (notify) {
    notify({
      name: "ACTION_ASSIGNER",
      containsInformation: true,
      extractionSuccessful: true,
      actions: memoryActions,
    });
  }

  // category assigner
  const memoryCategories = categoryAssigner(llmMessage)(memoryActions);
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
