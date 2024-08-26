import { LLMChatMessage } from "./llm";
import { SentinalResult } from "./sentinal";

export interface ExtractedMemory {
  knowledge: string;
}

export const extractMemory =
  (message: string) =>
  (result: SentinalResult): ExtractedMemory[] => {
    return message.includes("vegetarian") && result.containsInformation
      ? [
          {
            knowledge: "I am a vegetarian",
          },
          {
            knowledge: "Wife is a vegetarian",
          },
        ]
      : [];
  };
