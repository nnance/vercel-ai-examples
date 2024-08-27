import { MemoryAction } from "./interfaces";
import { LLMChatMessage } from "./llm";

interface MemoryReviewResults {
  extractionSuccessful: boolean;
  confidence: number;
}

export const checkMemoryExtraction =
  (message: LLMChatMessage) =>
  (extractedMemory: MemoryAction[]): MemoryReviewResults => {
    return message.text.includes("vegetarian") && extractedMemory.length === 2
      ? {
          extractionSuccessful: true,
          confidence: 1,
        }
      : {
          extractionSuccessful: false,
          confidence: 1,
        };
  };
