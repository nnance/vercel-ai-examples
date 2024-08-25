import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from "lucide-react";

export function Chat() {
  return (
    <div className="md:col-span-1 flex flex-col h-full">
      <div
        className="flex-grow overflow-y-auto mb-4 space-y-4"
        aria-label="Chat messages"
      >
        <div className="bg-orange-100 p-3 rounded-md">
          <h3 className="font-semibold text-orange-700">You</h3>
          <p>My wife and I are vegetarian.</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-md">
          <h3 className="font-semibold text-blue-700">Chef Lisa</h3>
          <p>
            Got it! So, you and your wife are both vegetarian. Now, do either of
            you have any allergies that I should be aware of?
          </p>
        </div>
        {/* Additional messages can be added here */}
      </div>
      <div className="flex flex-col space-y-2">
        <Input placeholder="Chat with Lisa" aria-label="Chat input" />
        <Button className="w-full">
          <MessageCircle className="mr-2 h-4 w-4" />
          Submit
        </Button>
      </div>
    </div>
  );
}
