"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ship, AlertTriangle, CheckCircle, Clock, Beaker, FileText, TrendingUp, Eye, History } from "lucide-react"
import { ships, waterAnalysisData, technicians } from "@/lib/mock-data"

export default function TechnicianPage() {
  // Mock technician data - in real app this would come from authentication
  const technicianId = "tech-001"
  const technician = technicians.find(t => t.id === technicianId)
  
  if (!technician) {
    return <div>Technician not found</div>
  }
  
  // Get current ship data
  const currentShip = ships.find(ship => ship.id === technician.currentShip)
  const currentShipAnalysis = waterAnalysisData[technician.currentShip as keyof typeof waterAnalysisData]
  
  if (!currentShip || !currentShipAnalysis) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Technician Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {technician.name}.
          </p>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Ship className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Ship Assigned</h3>
              <p className="text-gray-500">
                You don't have a ship assignment yet. Contact your administrator.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800"
      case "Attention": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Technician Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {technician.name}. Current assignment: {currentShip.name}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Current Ship Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ship className="h-6 w-6" />
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for water analysis management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="h-16 flex-col">
                <Beaker className="h-5 w-5 mb-1" />
                <span className="text-xs">Add Analysis</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <FileText className="h-5 w-5 mb-1" />
                <span className="text-xs">View Reports</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <TrendingUp className="h-5 w-5 mb-1" />
                <span className="text-xs">View Trends</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <History className="h-5 w-5 mb-1" />
                <span className="text-xs">History</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
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
      </div>
    </div>
  )
}
