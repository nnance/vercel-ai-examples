import { generateObject } from "ai";
import { z } from "zod";
import { MemoryAction } from "./interfaces";
import { getModelName, getProvider } from "./llm";

const systemPrompt = (existing_memories: string, new_memories: string) => `
Your job is to determine what to do with a list of memories extracted from a chat history.

You will compare a list of new memories to an existing list. You will need to determine if the new memories are new information, updates to old information, or if they should result in deleting information that is not correct.

The options for actions are as follows:

1. CREATE a new piece of information
2. UPDATE an existing piece of information
3. DELETE an existing piece of information

When you receive a message, you perform a sequence of steps consisting of:

1. Internally analyze and understand all the existing memories
2. Internally compare the new memories to the existing list
3. For each piece of new knowledge, determine if this is new knowledge, an update to old knowledge that now needs to change, or should result in deleting information that is not correct. It's possible that a food you previously wrote as a dislike might now be a like, or that a family member who previously liked a food now dislikes it - those examples would require an update.

Here are the existing bits of information that we have about the family.


${existing_memories}


I will tip you $20 if you are perfect, and I will fine you $40 if you miss any important information or change any incorrect information.

Take a deep breath, think step by step, and then analyze the following memories:

${new_memories}
`;

export const actionAssigner =
  (message: string) =>
  async (
    extractedMemory: MemoryAction[],
    existingMemories: []
  ): Promise<MemoryAction[]> => {
    const provider = getProvider(process.env.NEXT_PUBLIC_PROVIDER);
    const modelName = getModelName(process.env.NEXT_PUBLIC_PROVIDER);
    const model = provider(modelName);

    const { object } = await generateObject({
      model,
      system: systemPrompt(
        JSON.stringify(existingMemories),
        JSON.stringify(extractedMemory)
      ),
      prompt: message,
      output: "array",
      schema: z.object({
        knowledge: z.string({
          description: "If this failed, provide your explanation",
        }),
        action: z.enum(["CREATE", "UPDATE", "DELETE"], {
          description:
            "The action to take on this memory: either CREATE, UPDATE, or DELETE",
        }),
      }),
    });

    return object;
  };
