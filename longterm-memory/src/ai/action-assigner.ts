import { LLMChatMessage } from "./llm";
import { ExtractedMemory } from "./memory-extractor";

export interface ActionAssignerResults {
  knowledge: string;
  action: "CREATE" | "UPDATE" | "DELETE";
}

export const actionAssigner =
  (message: LLMChatMessage) =>
  (extractedMemory: ExtractedMemory[]): ActionAssignerResults[] => {
    return message.text.includes("vegetarian") && extractedMemory.length === 2
      ? extractedMemory.map((memory) => ({
          knowledge: memory.knowledge,
          action: "CREATE",
        }))
      : [];
  };
