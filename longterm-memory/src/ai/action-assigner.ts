import { MemoryAction } from "./interfaces";
import { LLMChatMessage } from "./llm";

export const actionAssigner =
  (message: LLMChatMessage) =>
  (extractedMemory: MemoryAction[]): MemoryAction[] => {
    return message.text.includes("vegetarian") && extractedMemory.length === 2
      ? extractedMemory.map((memory) => ({
          knowledge: memory.knowledge,
          action: "CREATE",
        }))
      : [];
  };
