import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";

export interface ChatMessage {
  text: string;
  sender: "user" | "chef";
}

export interface ChatProps {
  messages: ChatMessage[];
}

export function Chat(props: ChatProps) {
  const { messages } = props;

  const renderMessage = (message: ChatMessage, index: number) => {
    return (
      <div
        key={index}
        className={`bg-${
          message.sender === "user" ? "orange" : "blue"
        }-100 p-3 rounded-md`}
      >
        <h3
          className={`font-semibold text-${
            message.sender === "user" ? "orange" : "blue"
          }-700`}
        >
          {message.sender === "user" ? "You" : "Chef Lisa"}
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
            <Input placeholder="Chat with Lisa" aria-label="Chat input" />
            <Button className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
