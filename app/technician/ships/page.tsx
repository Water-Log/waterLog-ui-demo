"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Ship, AlertTriangle, CheckCircle, Clock, Beaker, Eye, History, Calendar } from "lucide-react"
import { ships, waterAnalysisData, technicians } from "@/lib/mock-data"
import { useState } from "react"

export default function TechnicianShipsPage() {
  const [showHistory, setShowHistory] = useState(false)
  
  // Mock technician data - in real app this would come from authentication
  const technicianId = "tech-001"
  const technician = technicians.find(t => t.id === technicianId)
  
  if (!technician) {
    return <div>Technician not found</div>
  }
  
  // Get current ship data
  const currentShip = ships.find(ship => ship.id === technician.currentShip)
  const currentShipAnalysis = waterAnalysisData[technician.currentShip as keyof typeof waterAnalysisData]
  
  // Get historical ships
  const historicalAssignments = technician.assignmentHistory.filter(assignment => 
    assignment.endDate !== null // Only show completed assignments
  )

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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Ships</h1>
        <p className="text-muted-foreground mt-2">
          Current assignment and assignment history
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Assignment */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Current Assignment</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Active
            </Badge>
          </div>

          {currentShip && currentShipAnalysis ? (
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Ship className="h-6 w-6 text-blue-600" />
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
                    <div className="text-sm">{formatDate(technician.assignmentHistory.find(a => a.endDate === null)?.startDate || '')}</div>
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
                  <Button className="flex items-center gap-2">
                    <Beaker className="h-4 w-4" />
                    Add Analysis
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
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
          )}
        </div>

        <Separator />

        {/* Assignment History */}
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
                    <Card key={index} className="opacity-75">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Ship className="h-5 w-5 text-gray-500" />
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
                              {assignment.endDate 
                                ? Math.ceil((new Date(assignment.endDate).getTime() - new Date(assignment.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
                                : 0} months
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
      </div>
    </div>
  )
}
