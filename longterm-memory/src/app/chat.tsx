import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";
import { Message, useChat } from "ai/react";
import { AgentEvent, AgentStatus, Memory } from "@/interfaces";
import { useCallback, useEffect, useMemo } from "react";
import { useStreamPost } from "@/lib/hooks/stream-post";

interface ChatProps {
  memories: Memory[];
  setMemories: (memories: Memory[]) => void;
  eventHandler: (event: AgentEvent) => void;
}

function systemMessage(memories: Memory[]): Message {
  return {
    id: "0",
    role: "system",
    content: `users food preference and restrictions: ${JSON.stringify(
      memories
    )}`,
  };
}

export function Chat({ memories, setMemories, eventHandler }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      initialMessages: [systemMessage(memories)],
    });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  // Handle incoming messages from the assistant
  const onNext = useCallback(
    (value: string) => {
      try {
        const { type, payload } = JSON.parse(value) as AgentStatus;
        if (type === "EVENT") {
          eventHandler(payload as AgentEvent);
        } else if (type === "MEMORY") {
          const memories = payload as Memory[];
          setMessages((messages) =>
            messages.map((m) =>
              m.role !== "system" ? m : systemMessage(memories)
            )
          );
          setMemories(memories);
        }
      } catch (e: any) {
        console.warn(e.message);
      }
    },
    [eventHandler, setMessages, setMemories]
  );

  const { setPayload } = useStreamPost("/api/assistant", { onNext });

  // Send the latest user message and memories to the assistant
  useEffect(() => {
    const message = messages[messages.length - 1];
    if (message.role !== "user") return;

    setPayload(JSON.stringify({ message, memories }));
  }, [messages, memories, setPayload]);

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
            className="overflow-y-auto mb-4 space-y-4 h-[calc(100vh-15rem)]"
            aria-label="Chat messages"
          >
            {messages.filter((m) => m.role !== "system").map(renderMessage)}
          </div>
          <form onSubmit={handleSubmit}>
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
