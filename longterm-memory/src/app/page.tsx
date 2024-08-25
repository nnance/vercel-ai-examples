import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from "lucide-react";
import { MemoryExtraction } from "./memory-extraction";
import { Memories } from "./memories";
import { Chat } from "./chat";

export default function Component() {
  return (
    <div className="w-full h-screen bg-gray-100 p-0">
      <Card className="w-full h-full rounded-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Memory Extraction Agent</CardTitle>
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=50&width=50" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="p-4 h-[calc(100vh-5rem)]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
            <Chat />
            <MemoryExtraction />
            <Memories />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
