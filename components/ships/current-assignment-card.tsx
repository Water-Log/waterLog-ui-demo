import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ship as ShipIcon, AlertTriangle, Beaker, Eye, Droplets } from "lucide-react"
import Link from "next/link"
import { Ship, ShipAnalysis, Technician } from "./types"

interface CurrentAssignmentCardProps {
  currentShip: Ship
  currentShipAnalysis: ShipAnalysis
  technician: Technician
}

export function CurrentAssignmentCard({ 
  currentShip, 
  currentShipAnalysis, 
  technician 
}: CurrentAssignmentCardProps) {
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

  const currentAssignment = technician.assignmentHistory.find(a => a.endDate === null)

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShipIcon className="h-6 w-6 text-blue-600" />
            <div>
              <CardTitle className="text-blue-900">{currentShip.name}</CardTitle>
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
            <div className="text-sm font-medium text-muted-foreground">Assignment Date</div>
            <div className="text-sm">{currentAssignment ? formatDate(currentAssignment.startDate) : 'N/A'}</div>
          </div>
        </div>
        
        {/* Latest Water Analysis */}
        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium">Latest Water Analysis</h4>
            <span className="text-xs text-muted-foreground">{currentShipAnalysis.lastAnalysisDate}</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="text-center p-2 bg-background rounded">
              <div className="text-sm font-semibold">{currentShipAnalysis.analyses.nitrite.value}</div>
              <div className="text-xs text-muted-foreground">Nitrite (ppm)</div>
            </div>
            <div className="text-center p-2 bg-background rounded">
              <div className="text-sm font-semibold">{currentShipAnalysis.analyses.chloride.value}</div>
              <div className="text-xs text-muted-foreground">Chloride (ppm)</div>
            </div>
            <div className="text-center p-2 bg-background rounded">
              <div className="text-sm font-semibold">{currentShipAnalysis.analyses.pH.value}</div>
              <div className="text-xs text-muted-foreground">pH Level</div>
            </div>
            <div className="text-center p-2 bg-background rounded">
              <div className="text-sm font-semibold">{currentShipAnalysis.analyses.totalHardness.value}</div>
              <div className="text-xs text-muted-foreground">Hardness (ppm)</div>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        {currentShipAnalysis.alerts && currentShipAnalysis.alerts.length > 0 && (
          <div className="p-3 bg-red-50 rounded-lg mb-4">
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

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/technician/water-analysis">
            <Button className="flex items-center gap-2">
              <Beaker className="h-4 w-4" />
              Add Analysis
            </Button>
          </Link>
          <Link href="/technician/chemicals">
            <Button variant="outline" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Add Chemicals
            </Button>
          </Link>
          <Link href={`/technician/ships/${currentShip.id}`}>
            <Button variant="secondary" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
