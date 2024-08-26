import { MemoryAction } from "./interfaces";
import { LLMChatMessage } from "./llm";

export const categoryAssigner =
  (message: LLMChatMessage) =>
  (memoryWithActions: MemoryAction[]): MemoryAction[] => {
    return message.text.includes("vegetarian") && memoryWithActions.length === 2
      ? memoryWithActions.map((memory) => ({
          ...memory,
          category: "ATTRIBUTE",
        }))
      : [];
  };
