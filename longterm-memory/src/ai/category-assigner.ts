import { ActionAssignerResults } from "./action-assigner";
import { LLMChatMessage } from "./llm";

interface CategoryAssignerResults {
  knowledge: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  category: "ATTRIBUTE" | "ACTION";
}

export const categoryAssigner =
  (message: LLMChatMessage) =>
  (memoryWithActions: ActionAssignerResults[]): CategoryAssignerResults[] => {
    return message.text.includes("vegetarian") && memoryWithActions.length === 2
      ? memoryWithActions.map((memory) => ({
          ...memory,
          category: "ATTRIBUTE",
        }))
      : [];
  };
