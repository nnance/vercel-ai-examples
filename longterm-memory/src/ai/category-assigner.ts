import { generateObject } from "ai";
import { z } from "zod";
import { MemoryAction } from "./interfaces";
import { getModelName, getProvider } from "./llm";

const systemPrompt = (memories: string) => `
Your job is to assign a category to each memory in a list of new memories.

The options for categories are as follows:

1. ALLERGY. This is only assigned when it is a serious allergy, and not just a like, a dislike, or a sensitivity. Allergies are potentially life-threatening.
2. LIKE. This is assigned to foods the family likes (e.g. likes pasta) - These are important to know because they can help you plan meals, but are not life-threatening.
3. DISLIKE. This is assigned to foods the family dislikes (e.g. doesn't eat mussels or rarely eats beef) - These are important to know because they can help you plan meals, but are not life-threatening.
4. ATTRIBUTE. These are immutable facts about the family that may impact weekly meal planning (e.g. lives in Austin; has a husband and 2 children; has a garden; likes big lunches, etc.)

When you receive a message, you perform a sequence of steps consisting of:

1. Internally analyze and understand each of the memories in the list provided
2. Internally assign a category to each memory
3. Return the list of memories with the new categories you have determined. Do not change any of the original text of the memories, only add a category assignation.

Here are the memories for you to assign categories to:

${memories}

I will tip you $20 if you are perfect, and I will fine you $40 if you miss any important information or change any incorrect information.

Take a deep breath, and think step by step.
`;

export const categoryAssigner =
  (message: string) =>
  async (memoryWithActions: MemoryAction[]): Promise<MemoryAction[]> => {
    const provider = getProvider(process.env.NEXT_PUBLIC_PROVIDER);
    const modelName = getModelName(process.env.NEXT_PUBLIC_PROVIDER);
    const model = provider(modelName);

    const { object } = await generateObject({
      model,
      system: systemPrompt(JSON.stringify(memoryWithActions)),
      prompt: message,
      output: "array",
      schema: z.object({
        knowledge: z.string({
          description: "If this failed, provide your explanation",
        }),
        category: z.enum(["ALLERGY", "LIKE", "DISLIKE", "ATTRIBUTE"], {
          description:
            "The category for this action: either ALLERGY, LIKE, DISLIE, OR ATTRIBUTE",
        }),
      }),
    });

    return object;
  };
