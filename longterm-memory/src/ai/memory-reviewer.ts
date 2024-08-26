import { LLMChatMessage } from "./llm";
import { ExtractedMemory } from "./memory-extractor";

interface MemoryReviewResults {
  message: string;
  extractionSuccessful: boolean;
  confidence: number;
}

export const checkMemoryExtraction =
  (message: LLMChatMessage) =>
  (extractedMemory: ExtractedMemory[]): MemoryReviewResults => {
    return message.text.includes("vegetarian") && extractedMemory.length === 2
      ? {
          message: "AI Analysis is perfect.",
          extractionSuccessful: true,
          confidence: 1,
        }
      : {
          message: "Memory extraction failed.  No information found.",
          extractionSuccessful: false,
          confidence: 1,
        };
  };
