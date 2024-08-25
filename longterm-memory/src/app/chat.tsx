import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export interface ChatMessage {
  text: string;
  sender: "USER" | "CHEF";
}

export interface ChatProps {
  messages: ChatMessage[];
  sendMessage: (message: ChatMessage) => void;
}

export function Chat(props: ChatProps) {
  const { messages, sendMessage } = props;
  const [message, setMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    sendMessage({
      text: message,
      sender: "USER",
    });
    setMessage("");
    // set the focus back to the input field
    document.querySelector("input")?.focus();
  };

  const renderMessage = (message: ChatMessage, index: number) => {
    return (
      <div
        key={index}
        className={
          message.sender === "USER"
            ? "bg-orange-100 p-3 rounded-md"
            : "bg-blue-100 p-3 rounded-md"
        }
      >
        <h3
          className={
            message.sender === "USER"
              ? "font-semibold text-orange-700"
              : "font-semibold text-blue-700"
          }
        >
          {message.sender === "USER" ? "You" : "Chef Lisa"}
        </h3>
        <p>{message.text}</p>
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
          <div className="flex flex-col space-y-2">
            <Input
              placeholder="Chat with Lisa"
              aria-label="Chat input"
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <Button className="w-full" onClick={handleButtonClick}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
