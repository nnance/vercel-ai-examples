"use client";

import { useChat } from "ai/react";
import ChatInput from "./chat-input";
import ChatOutput from "./chat-output";

export default function ChatPanel() {
  const store = useChat();
  return (
    <>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl p-4 lg:col-span-">
        <ChatInput store={store} />
      </div>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <ChatOutput store={store} />
      </div>
    </>
  );
}
