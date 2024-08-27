import { MemoryAction } from "./interfaces";
import { SentinalResult } from "./sentinal";

export const extractMemory =
  (message: string) =>
  (result: SentinalResult): MemoryAction[] => {
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
