import { actionAssigner } from "./action-assigner";
import { categoryAssigner } from "./category-assigner";
import { chatCompletion } from "./llm";
import { extractMemory } from "./memory-extractor";
import { checkMemoryExtraction } from "./memory-reviewer";
import { sentinalCheck } from "./sentinal";

export interface MemoryAction {
  knowledge: string;
  action?: "CREATE" | "UPDATE" | "DELETE";
  category?: "ATTRIBUTE" | "ACTION";
}

export interface AgentEvent {
  name:
    | "USER"
    | "ASSISTANT"
    | "SENTINEL"
    | "MEMORY_EXTRACTOR"
    | "MEMORY_REVIEWER"
    | "ACTION_ASSIGNER"
    | "CATEGORY_ASSIGNER";
  messages: string[];
  actions: MemoryAction[];
}

export function cookingAssistant(
  message: string,
  notify: (event: AgentEvent) => void
) {
  const llmMessage = chatCompletion({
    text: message,
    sender: "USER",
  });
  notify({
    name: "ASSISTANT",
    messages: [llmMessage.text],
    actions: [],
  });

  // sentinal check
  const sentinalMessage = sentinalCheck(message);
  notify({
    name: "SENTINEL",
    messages: [sentinalMessage.message],
    actions: [],
  });

  // memory extraction
  const memoryExtraction = extractMemory(message)(sentinalMessage);
  const memories = memoryExtraction.reduce((acc, memory, idx) => {
    return idx < memoryExtraction.length - 1
      ? acc + `"${memory.knowledge}", `
      : acc + `"${memory.knowledge}"`;
  }, "");
  notify({
    name: "MEMORY_EXTRACTOR",
    messages: [`Memory extraction results from attempt #1: ${memories}`],
    actions: memoryExtraction,
  });

  // memory review
  const memoryReview = checkMemoryExtraction(llmMessage)(memoryExtraction);
  notify({
    name: "MEMORY_REVIEWER",
    messages: [memoryReview.message],
    actions: [],
  });

  // action assigner
  const memoryActions = actionAssigner(llmMessage)(memoryExtraction);
  const actions = { memories: memoryActions };
  notify({
    name: "ACTION_ASSIGNER",
    messages: ["Added actions: " + JSON.stringify(actions)],
    actions: memoryActions,
  });

  // category assigner
  const memoryCategories = categoryAssigner(llmMessage)(memoryActions);
  const categories = { memories: memoryCategories };
  notify({
    name: "CATEGORY_ASSIGNER",
    messages: ["Added categories: " + JSON.stringify(categories)],
    actions: memoryCategories,
  });
}
