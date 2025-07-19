import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ship as ShipIcon } from "lucide-react"
import { Ship, ShipAnalysis, AssignmentHistory } from "./types"

interface ShipInformationCardProps {
  ship: Ship
  currentAnalysis: ShipAnalysis | undefined
  assignment: AssignmentHistory | undefined
  isCurrentShip: boolean
}

export function ShipInformationCard({ 
  ship, 
  currentAnalysis, 
  assignment, 
  isCurrentShip 
}: ShipInformationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800"
      case "Attention": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className={isCurrentShip ? "border-l-4 border-l-blue-500" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShipIcon className={`h-6 w-6 ${isCurrentShip ? 'text-blue-600' : 'text-gray-600'}`} />
            <div>
              <CardTitle className={isCurrentShip ? "text-blue-900" : "text-gray-700"}>
                {ship.name}
              </CardTitle>
              <CardDescription>{ship.type} • IMO: {ship.imo}</CardDescription>
            </div>
          </div>
          {currentAnalysis && (
            <Badge className={getStatusColor(currentAnalysis.currentStatus)}>
              {currentAnalysis.currentStatus}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Captain</div>
            <div className="text-sm font-medium">{ship.captain}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Location</div>
            <div className="text-sm font-medium">{ship.location}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Assignment Period</div>
            <div className="text-sm font-medium">
              {assignment ? (
                assignment.endDate 
                  ? `${formatDate(assignment.startDate)} - ${formatDate(assignment.endDate)}`
                  : `${formatDate(assignment.startDate)} - Present`
              ) : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Last Analysis</div>
            <div className="text-sm font-medium">{currentAnalysis?.lastAnalysisDate || 'N/A'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
