import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";
import { Message, useChat } from "ai/react";
import { ChatRequestOptions } from "ai";
import { Dispatch, SetStateAction } from "react";
import { AgentEvent, Memory } from "@/interfaces";

interface ChatProps {
  setMemories: Dispatch<SetStateAction<Memory[]>>;
  eventHandler: (event: AgentEvent) => void;
}

/**
 * Generator function that streams the response body from a fetch request.
 */
export async function* streamingFetch(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const response = await fetch(input, init);
  const reader = response.body!.getReader();
  const decoder = new TextDecoder("utf-8");

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;

    try {
      yield decoder.decode(value);
    } catch (e: any) {
      console.warn(e.message);
    }
  }
}

export function Chat({ setMemories, eventHandler }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const asyncFetch = async () => {
    const it = streamingFetch("/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    for await (let value of it) {
      try {
        const event = JSON.parse(value) as AgentEvent;
        eventHandler(event);
      } catch (e: any) {
        console.warn(e.message);
      }
    }
  };

  const handleSend = (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => {
    asyncFetch();
    handleSubmit(event, chatRequestOptions);
  };

  const renderMessage = (message: Message, index: number) => {
    return (
      <div
        key={index}
        className={
          message.role === "user"
            ? "bg-orange-100 p-3 rounded-md"
            : "bg-blue-100 p-3 rounded-md"
        }
      >
        <h3
          className={
            message.role === "user"
              ? "font-semibold text-orange-700"
              : "font-semibold text-blue-700"
          }
        >
          {message.role === "user" ? "You" : "Chef Lisa"}
        </h3>
        <p>{message.content}</p>
      </div>
    );
  };

  return (
    <div className="md:col-span-1 flex flex-col h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cooking Assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div
            className="flex-grow overflow-y-auto mb-4 space-y-4"
            aria-label="Chat messages"
          >
            {messages.map(renderMessage)}
          </div>
          <form onSubmit={handleSend}>
            <div className="flex flex-col space-y-2">
              <Input
                placeholder="Chat with Lisa"
                aria-label="Chat input"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <Button className="w-full" onClick={handleSubmit}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
