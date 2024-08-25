import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, X } from "lucide-react";

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
                    Got it! So, you and your wife are both vegetarian. Now, do
                    either of you have any allergies that I should be aware of?
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
            <div className="md:col-span-2 space-y-4 overflow-y-auto h-full">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Sentinel</Badge>
                  <span className="text-sm text-gray-600">
                    Message contains information.
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-orange-500">
                    Memory Extractor
                  </h4>
                  <p className="text-sm">
                    {
                      'Memory extraction results from attempt #1: "Wife is a vegetarian", "I am a vegetarian"'
                    }
                  </p>
                  <p className="text-sm">
                    {'Memory 1: "Wife is a vegetarian"'}
                  </p>
                  <p className="text-sm">{'Memory 2: "I am a vegetarian"'}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-orange-500">
                    Memory Reviewer
                  </h4>
                  <p className="text-sm">AI analysis is perfect.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-orange-500">
                    Action Assigner
                  </h4>
                  <p className="text-sm">{`Added actions: {"memories": [{"knowledge": "I am a vegetarian", "action": "CREATE"}, {"knowledge": "Wife is a vegetarian", "action": "CREATE"}]}`}</p>
                  <p className="text-sm">{`Memory 1: {"knowledge":"I am a vegetarian","action":"CREATE"}`}</p>
                  <p className="text-sm">{`Memory 2: {"knowledge":"Wife is a vegetarian","action":"CREATE"}`}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-orange-500">
                    Category Assigner
                  </h4>
                  <p className="text-sm">{`Added categories: {"memories": [{"knowledge": "I am a vegetarian", "category": "ATTRIBUTE", "action": "CREATE"}, {"knowledge": "Wife is a vegetarian", "category": "ATTRIBUTE", "action": "CREATE"}]}`}</p>
                  <p className="text-sm">{`Memory 1: {"knowledge":"I am a vegetarian","category":"ATTRIBUTE","action":"CREATE"}`}</p>
                  <p className="text-sm">{`Memory 2: {"knowledge":"Wife is a vegetarian","category":"ATTRIBUTE","action":"CREATE"}`}</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 overflow-y-auto h-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Long-Term Memories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Badge>Attribute</Badge>
                    <span className="text-sm">I am a vegetarian</span>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <Badge>Attribute</Badge>
                    <span className="text-sm">Wife is a vegetarian</span>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
