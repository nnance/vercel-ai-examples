import { AgentEvent } from "@/interfaces";
import { cookingAssistant } from "../../ai/assistant";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { input } = await req.json();
  console.dir(input);

  let events: AgentEvent[] = [];
  const eventHandler = (event: AgentEvent) => {
    events.push(event);
  };

  const memories = await cookingAssistant({
    message: input,
    memories: [],
    notify: eventHandler,
  });

  const response = {
    memories,
    events,
  };

  console.dir(response, { depth: null });

  // return http response
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
