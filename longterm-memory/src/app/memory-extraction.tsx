import { Badge } from "@/components/ui/badge";

export function MemoryExtraction() {
  return (
    <div className="md:col-span-2 space-y-4 overflow-y-auto h-full">
      <div className="space-y-2">
        <div className="space-y-1">
          <h4 className="font-semibold text-orange-500">Sentinel</h4>
          <p className="text-sm">Message contains information.</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-orange-500">Memory Extractor</h4>
          <p className="text-sm">
            {
              'Memory extraction results from attempt #1: "Wife is a vegetarian", "I am a vegetarian"'
            }
          </p>
          <p className="text-sm">{'Memory 1: "Wife is a vegetarian"'}</p>
          <p className="text-sm">{'Memory 2: "I am a vegetarian"'}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-orange-500">Memory Reviewer</h4>
          <p className="text-sm">AI analysis is perfect.</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-orange-500">Action Assigner</h4>
          <p className="text-sm">{`Added actions: {"memories": [{"knowledge": "I am a vegetarian", "action": "CREATE"}, {"knowledge": "Wife is a vegetarian", "action": "CREATE"}]}`}</p>
          <p className="text-sm">{`Memory 1: {"knowledge":"I am a vegetarian","action":"CREATE"}`}</p>
          <p className="text-sm">{`Memory 2: {"knowledge":"Wife is a vegetarian","action":"CREATE"}`}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-orange-500">Category Assigner</h4>
          <p className="text-sm">{`Added categories: {"memories": [{"knowledge": "I am a vegetarian", "category": "ATTRIBUTE", "action": "CREATE"}, {"knowledge": "Wife is a vegetarian", "category": "ATTRIBUTE", "action": "CREATE"}]}`}</p>
          <p className="text-sm">{`Memory 1: {"knowledge":"I am a vegetarian","category":"ATTRIBUTE","action":"CREATE"}`}</p>
          <p className="text-sm">{`Memory 2: {"knowledge":"Wife is a vegetarian","category":"ATTRIBUTE","action":"CREATE"}`}</p>
        </div>
      </div>
    </div>
  );
}
