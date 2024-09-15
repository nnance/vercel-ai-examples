import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const coreMessages = convertToCoreMessages(messages);
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages: coreMessages,
  });

  return result.toDataStreamResponse();
}
