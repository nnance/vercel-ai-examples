import { AgentEvent } from "@/interfaces";
import { cookingAssistant } from "../../ai/assistant";
import { NextRequest } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const makeStream = <T extends AgentEvent>(
  generator: AsyncGenerator<T, void, unknown>
) => {
  const encoder = new TextEncoder();
  return new ReadableStream<any>({
    async start(controller) {
      for await (let chunk of generator) {
        const chunkData = encoder.encode(JSON.stringify(chunk));
        controller.enqueue(chunkData);
      }
      controller.close();
    },
  });
};

/**
 * A custom Response subclass that accepts a ReadableStream.
 * This allows creating a streaming Response for async generators.
 */
class StreamingResponse extends Response {
  constructor(res: ReadableStream<any>, init?: ResponseInit) {
    super(res as any, {
      ...init,
      status: 200,
      headers: {
        ...init?.headers,
      },
    });
  }
}

export async function POST(req: NextRequest) {
  const { input } = (await req.json()) as { input: string };
  console.dir(input);

  const stream = makeStream(
    cookingAssistant({
      message: input,
      memories: [],
    })
  );
  const response = new StreamingResponse(stream);
  return response;
}
