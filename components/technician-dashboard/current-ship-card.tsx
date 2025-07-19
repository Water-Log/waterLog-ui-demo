import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ship as ShipIcon, AlertTriangle } from "lucide-react"
import { Ship, ShipAnalysis } from "./types"

interface CurrentShipCardProps {
  currentShip: Ship
  currentShipAnalysis: ShipAnalysis
}

export function CurrentShipCard({ currentShip, currentShipAnalysis }: CurrentShipCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800"
      case "Attention": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShipIcon className="h-6 w-6" />
            <div>
              <CardTitle>{currentShip.name}</CardTitle>
              <CardDescription>{currentShip.type} • IMO: {currentShip.imo}</CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(currentShipAnalysis.currentStatus)}>
            {currentShipAnalysis.currentStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Captain</div>
            <div className="text-sm">{currentShip.captain}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Location</div>
            <div className="text-sm">{currentShip.location}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Flag</div>
            <div className="text-sm">{currentShip.flag}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Capacity</div>
            <div className="text-sm">{currentShip.capacity}</div>
          </div>
        </div>
        
        {/* Water Analysis Parameters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold">{currentShipAnalysis.analyses.nitrite.value}</div>
            <div className="text-xs text-muted-foreground">Nitrite (ppm)</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold">{currentShipAnalysis.analyses.chloride.value}</div>
            <div className="text-xs text-muted-foreground">Chloride (ppm)</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold">{currentShipAnalysis.analyses.pH.value}</div>
            <div className="text-xs text-muted-foreground">pH Level</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold">{currentShipAnalysis.analyses.totalHardness.value}</div>
            <div className="text-xs text-muted-foreground">Hardness (ppm)</div>
          </div>
        </div>

        {/* Active Alerts */}
        {currentShipAnalysis.alerts && currentShipAnalysis.alerts.length > 0 && (
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm font-medium text-red-800 mb-2">
              <AlertTriangle className="h-4 w-4" />
              {currentShipAnalysis.alerts.length} Active Alert{currentShipAnalysis.alerts.length > 1 ? 's' : ''}
            </div>
            <div className="text-xs text-red-700">
              {currentShipAnalysis.alerts[0]}
              {currentShipAnalysis.alerts.length > 1 && ` (+${currentShipAnalysis.alerts.length - 1} more)`}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
