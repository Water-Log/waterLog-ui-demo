import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ship, ShipAnalysis } from "./types"

interface CurrentShipInfoProps {
  currentShip: Ship
  currentShipAnalysis: ShipAnalysis | undefined
}

export function CurrentShipInfo({ currentShip, currentShipAnalysis }: CurrentShipInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Current Assignment
          <Badge variant="outline">{currentShipAnalysis?.currentStatus}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="font-medium">{currentShip.name}</p>
            <p className="text-muted-foreground">{currentShip.type}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Location</p>
            <p className="font-medium">{currentShip.location}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Analysis</p>
            <p className="font-medium">{currentShipAnalysis?.lastAnalysisDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Next Due</p>
            <p className="font-medium">{currentShipAnalysis?.nextAnalysisDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
