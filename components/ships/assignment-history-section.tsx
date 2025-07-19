import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Calendar } from "lucide-react"
import { useState } from "react"
import { HistoricalAssignmentCard } from "./historical-assignment-card"
import { Ship, AssignmentHistory } from "./types"

interface AssignmentHistorySectionProps {
  historicalAssignments: AssignmentHistory[]
  ships: Ship[]
}

export function AssignmentHistorySection({ 
  historicalAssignments, 
  ships 
}: AssignmentHistorySectionProps) {
  const [showHistory, setShowHistory] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Assignment History</h2>
          <Badge variant="secondary">
            {historicalAssignments.length} past assignments
          </Badge>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2"
        >
          <History className="h-4 w-4" />
          {showHistory ? 'Hide History' : 'Show History'}
        </Button>
      </div>

      {showHistory && (
        <div className="space-y-4">
          {historicalAssignments.length > 0 ? (
            historicalAssignments.map((assignment, index) => {
              const ship = ships.find(s => s.id === assignment.shipId)
              if (!ship) return null
              
              return (
                <HistoricalAssignmentCard
                  key={index}
                  assignment={assignment}
                  ship={ship}
                />
              )
            })
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No previous assignments</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
