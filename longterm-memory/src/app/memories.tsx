import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export function Memories() {
  return (
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
  );
}
