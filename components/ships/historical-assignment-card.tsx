import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ship as ShipIcon, CheckCircle } from "lucide-react"
import { Ship, AssignmentHistory } from "./types"

interface HistoricalAssignmentCardProps {
  assignment: AssignmentHistory
  ship: Ship
}

export function HistoricalAssignmentCard({ assignment, ship }: HistoricalAssignmentCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateDuration = (startDate: string, endDate: string | null) => {
    if (!endDate) return 0
    return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
  }

  return (
    <Card className="opacity-75">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShipIcon className="h-5 w-5 text-gray-500" />
            <div>
              <CardTitle className="text-base text-gray-700">{assignment.shipName}</CardTitle>
              <CardDescription>{ship.type} • IMO: {ship.imo}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-gray-600">
            Completed
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium text-muted-foreground">Start Date</div>
            <div>{formatDate(assignment.startDate)}</div>
          </div>
          <div>
            <div className="font-medium text-muted-foreground">End Date</div>
            <div>{assignment.endDate ? formatDate(assignment.endDate) : 'Ongoing'}</div>
          </div>
          <div>
            <div className="font-medium text-muted-foreground">Duration</div>
            <div>
              {calculateDuration(assignment.startDate, assignment.endDate)} months
            </div>
          </div>
          <div>
            <div className="font-medium text-muted-foreground">Status</div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              Assignment Complete
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
