"use client";
import { Badge } from "@/components/ui/badge";
import { useChat } from "ai/react";
import { ChatMessage } from "./chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatOutputProps {
  store: ReturnType<typeof useChat>;
}

export default function ChatOutput({ store }: ChatOutputProps) {
  const { messages } = store;

  return (
    <>
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
      <ScrollArea className="h-72 w-48 rounded-md border">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
      </ScrollArea>
      <div className="flex-1" />
    </>
  );
}
