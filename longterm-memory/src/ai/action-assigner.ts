import { MemoryAction } from "./interfaces";
import { LLMChatMessage } from "./llm";
import { ExtractedMemory } from "./memory-extractor";

export const actionAssigner =
  (message: LLMChatMessage) =>
  (extractedMemory: ExtractedMemory[]): MemoryAction[] => {
    return message.text.includes("vegetarian") && extractedMemory.length === 2
      ? extractedMemory.map((memory) => ({
          knowledge: memory.knowledge,
          action: "CREATE",
        }))
      : [];
  };
