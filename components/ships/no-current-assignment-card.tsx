import { Card, CardContent } from "@/components/ui/card"
import { Ship } from "lucide-react"

export function NoCurrentAssignmentCard() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex items-center justify-center py-12">
        <div className="text-center">
          <Ship className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Current Assignment</h3>
          <p className="text-gray-500">
            You don't have a current ship assignment.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
