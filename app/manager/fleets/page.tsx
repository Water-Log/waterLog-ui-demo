import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Building2, 
  Ship, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Droplets,
  Beaker,
  Thermometer
} from "lucide-react"
import { fleets, waterAnalysisData, getFleetWaterAnalysisSummary } from "@/lib/mock-data"

export default function FleetsPage() {
  const fleetsWithAnalysis = fleets.map(fleet => ({
    ...fleet,
    waterAnalysis: getFleetWaterAnalysisSummary(fleet.id)
  }))

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Good":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Attention":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Good":
        return "default"
      case "Attention":
        return "secondary"
      case "Critical":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getAnalysisStatus = (value: number, parameter: string) => {
    switch (parameter) {
      case "nitrite":
        if (value >= 1000 && value <= 2400) return { status: "optimal", icon: <CheckCircle className="h-3 w-3 text-green-600" /> }
        else if (value < 1000) return { status: "low", icon: <TrendingDown className="h-3 w-3 text-red-600" /> }
        else return { status: "high", icon: <TrendingUp className="h-3 w-3 text-yellow-600" /> }
      case "chloride":
        if (value <= 50) return { status: "normal", icon: <CheckCircle className="h-3 w-3 text-green-600" /> }
        else if (value <= 80) return { status: "elevated", icon: <TrendingUp className="h-3 w-3 text-yellow-600" /> }
        else return { status: "critical", icon: <AlertTriangle className="h-3 w-3 text-red-600" /> }
      case "pH":
        if (value >= 8.3 && value <= 10) return { status: "good", icon: <CheckCircle className="h-3 w-3 text-green-600" /> }
        else return { status: "out of range", icon: <AlertTriangle className="h-3 w-3 text-red-600" /> }
      case "totalHardness":
        if (value <= 180) return { status: "acceptable", icon: <CheckCircle className="h-3 w-3 text-green-600" /> }
        else return { status: "high", icon: <TrendingUp className="h-3 w-3 text-red-600" /> }
      default:
        return { status: "unknown", icon: <Minus className="h-3 w-3 text-gray-600" /> }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fleet Water Analysis</h1>
        <p className="text-muted-foreground">
          Monitor cooling water analysis across all fleets for optimal ship performance
        </p>
      </div>

      {/* Fleet Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fleets</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetsWithAnalysis.length}</div>
            <p className="text-xs text-muted-foreground">
              Active fleets under monitoring
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ships in Good Condition</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {fleetsWithAnalysis.reduce((sum, fleet) => sum + fleet.waterAnalysis.goodCondition, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Optimal water parameters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {fleetsWithAnalysis.reduce((sum, fleet) => sum + fleet.waterAnalysis.needsAttention, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Minor adjustments needed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {fleetsWithAnalysis.reduce((sum, fleet) => sum + fleet.waterAnalysis.critical, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Immediate action required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Details */}
      <div className="grid gap-6">
        {fleetsWithAnalysis.map((fleet) => {
          const { waterAnalysis } = fleet
          const fleetShips = Object.values(waterAnalysisData).filter(ship => ship.fleetId === fleet.id)
          
          return (
            <Card key={fleet.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {fleet.name}
                    </CardTitle>
                    <CardDescription>{fleet.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(waterAnalysis.overallStatus)}
                    <Badge variant={getStatusBadgeVariant(waterAnalysis.overallStatus)}>
                      {waterAnalysis.overallStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Fleet Summary */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-3">
                    <Ship className="h-8 w-8 text-blue-600 bg-blue-100 rounded-lg p-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Ships</p>
                      <p className="text-xl font-bold">{waterAnalysis.totalShips}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-600 bg-green-100 rounded-lg p-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Good Condition</p>
                      <p className="text-xl font-bold text-green-600">{waterAnalysis.goodCondition}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-yellow-600 bg-yellow-100 rounded-lg p-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Need Attention</p>
                      <p className="text-xl font-bold text-yellow-600">{waterAnalysis.needsAttention}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-red-600 bg-red-100 rounded-lg p-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Critical</p>
                      <p className="text-xl font-bold text-red-600">{waterAnalysis.critical}</p>
                    </div>
                  </div>
                </div>

                {/* Average Water Analysis Parameters */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Beaker className="h-4 w-4" />
                    Fleet Average Water Analysis
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="p-3 rounded-lg border border-border bg-background">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Nitrite</span>
                        {waterAnalysis.averageAnalyses.nitrite ? getAnalysisStatus(waterAnalysis.averageAnalyses.nitrite, "nitrite").icon : <Minus className="h-3 w-3 text-gray-600" />}
                      </div>
                      <p className="text-lg font-bold">{waterAnalysis.averageAnalyses.nitrite || 0} ppm</p>
                      <p className="text-xs text-muted-foreground">Target: 1000-2400 ppm</p>
                    </div>

                    <div className="p-3 rounded-lg border border-border bg-background">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Chloride</span>
                        {waterAnalysis.averageAnalyses.chloride ? getAnalysisStatus(waterAnalysis.averageAnalyses.chloride, "chloride").icon : <Minus className="h-3 w-3 text-gray-600" />}
                      </div>
                      <p className="text-lg font-bold">{waterAnalysis.averageAnalyses.chloride || 0} ppm</p>
                      <p className="text-xs text-muted-foreground">Max: 50 ppm</p>
                    </div>

                    <div className="p-3 rounded-lg border border-border bg-background">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">pH Level</span>
                        {waterAnalysis.averageAnalyses.pH ? getAnalysisStatus(waterAnalysis.averageAnalyses.pH, "pH").icon : <Minus className="h-3 w-3 text-gray-600" />}
                      </div>
                      <p className="text-lg font-bold">{waterAnalysis.averageAnalyses.pH || 0}</p>
                      <p className="text-xs text-muted-foreground">Target: 8.3-10</p>
                    </div>

                    <div className="p-3 rounded-lg border border-border bg-background">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Total Hardness</span>
                        {waterAnalysis.averageAnalyses.totalHardness ? getAnalysisStatus(waterAnalysis.averageAnalyses.totalHardness, "totalHardness").icon : <Minus className="h-3 w-3 text-gray-600" />}
                      </div>
                      <p className="text-lg font-bold">{waterAnalysis.averageAnalyses.totalHardness || 0} ppm</p>
                      <p className="text-xs text-muted-foreground">Max: 180 ppm CaCO₃</p>
                    </div>
                  </div>
                </div>

                {/* Individual Ships Status */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Ship className="h-4 w-4" />
                    Ships Status Detail
                  </h4>
                  <div className="grid gap-3">
                    {fleetShips.map((ship) => (
                      <div key={ship.shipId} className="p-3 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{ship.shipName}</h5>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(ship.currentStatus)}
                            <Badge variant={getStatusBadgeVariant(ship.currentStatus)} className="text-xs">
                              {ship.currentStatus}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid gap-2 md:grid-cols-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Nitrite:</span>
                            <span className="ml-1 font-medium">{ship.analyses.nitrite.value} ppm</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Chloride:</span>
                            <span className="ml-1 font-medium">{ship.analyses.chloride.value} ppm</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">pH:</span>
                            <span className="ml-1 font-medium">{ship.analyses.pH.value}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Hardness:</span>
                            <span className="ml-1 font-medium">{ship.analyses.totalHardness.value} ppm</span>
                          </div>
                        </div>

                        {ship.alerts.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-1">Active Alerts:</p>
                            {ship.alerts.map((alert, index) => (
                              <p key={index} className="text-xs text-red-600 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {alert}
                              </p>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground">
                          Last Analysis: {new Date(ship.lastAnalysisDate).toLocaleDateString()} | 
                          Next Analysis: {new Date(ship.nextAnalysisDate).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
