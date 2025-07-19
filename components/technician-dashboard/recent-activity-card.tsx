import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Beaker, CheckCircle, Clock } from "lucide-react"
import { Ship, ShipAnalysis } from "./types"

interface RecentActivityCardProps {
  currentShip: Ship
  currentShipAnalysis: ShipAnalysis
}

export function RecentActivityCard({ currentShip, currentShipAnalysis }: RecentActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions for {currentShip.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Beaker className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Water analysis completed</p>
              <p className="text-xs text-muted-foreground">{currentShipAnalysis.lastAnalysisDate}</p>
            </div>
            <Badge variant="outline">Complete</Badge>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Chemical addition recorded</p>
              <p className="text-xs text-muted-foreground">{currentShipAnalysis.lastChemicalAddition}</p>
            </div>
            <Badge variant="outline">Recorded</Badge>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Clock className="h-5 w-5 text-orange-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Next analysis scheduled</p>
              <p className="text-xs text-muted-foreground">{currentShipAnalysis.nextAnalysisDate}</p>
            </div>
            <Badge variant="outline">Scheduled</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
