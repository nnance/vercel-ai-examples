import { AgentEvent, AgentStatus, Memory } from "@/interfaces";
import { cookingAssistant } from "../../ai/assistant";
import { NextRequest, NextResponse } from "next/server";

const encodeAgentStatus = (status: AgentStatus) => {
  const encoder = new TextEncoder();
  return encoder.encode(JSON.stringify(status));
};

const makeStream = <T extends AgentEvent, Y extends Memory[]>(
  generator: AsyncGenerator<T, Y, unknown>
) => {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encodeAgentStatus({ type: "BUSY", isBusy: true }));
      const it = generator[Symbol.asyncIterator]();
      let r;
      while ((r = await it.next())) {
        const status: AgentStatus = r.done
          ? { type: "MEMORY", isBusy: false, payload: r.value }
          : { type: "EVENT", isBusy: true, payload: r.value };
        controller.enqueue(encodeAgentStatus(status));
        if (r.done) break;
      }
      controller.close();
    },
  });
};

export async function POST(req: NextRequest) {
  const { input } = (await req.json()) as { input: string };

  const stream = makeStream(
    cookingAssistant({
      message: input,
      memories: [],
    })
  );
  const response = new NextResponse(stream);
  return response;
}
