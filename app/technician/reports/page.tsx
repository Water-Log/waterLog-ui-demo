"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Ship, AlertCircle, History, Calendar } from "lucide-react"
import { useState } from "react"
import { 
  ships, 
  waterAnalysisData, 
  technicians
} from "@/lib/mock-data"
import { MonthlyReportCard } from "@/components/reports/monthly-report-card"

export default function TechnicianReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("07")
  const [selectedYear, setSelectedYear] = useState<string>("2024")
  const [showHistoricalShips, setShowHistoricalShips] = useState(false)
  const [selectedHistoricalShip, setSelectedHistoricalShip] = useState<string>("")
  
  // Mock technician data - in real app this would come from authentication
  const technicianId = "tech-001"
  const technician = technicians.find(t => t.id === technicianId)
  
  if (!technician) {
    return <div>Technician not found</div>
  }
  
  // Get current ship
  const currentShip = ships.find(s => s.id === technician.currentShip)
  const currentShipAnalysis = waterAnalysisData[technician.currentShip as keyof typeof waterAnalysisData]
  
  // Get historical ships from assignment history
  const historicalShips = technician.assignmentHistory
    .filter(assignment => assignment.endDate !== null) // Only completed assignments
    .map(assignment => {
      const ship = ships.find(s => s.id === assignment.shipId)
      return ship ? { ...ship, assignmentPeriod: `${assignment.startDate} - ${assignment.endDate}` } : null
    })
    .filter(Boolean)
  
  // Determine which ship to show report for
  const reportShip = showHistoricalShips && selectedHistoricalShip 
    ? ships.find(s => s.id === selectedHistoricalShip)
    : currentShip
  const reportShipAnalysis = showHistoricalShips && selectedHistoricalShip
    ? waterAnalysisData[selectedHistoricalShip as keyof typeof waterAnalysisData]
    : currentShipAnalysis
  
  const getStatusColor = (status: string | undefined) => {
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
      <div>
        <h1 className="text-3xl font-bold">Water Analysis Reports</h1>
        <p className="text-muted-foreground mt-2">
          Historical water analysis data with AI insights for your assigned ships
        </p>
      </div>

      {/* Current Assignment Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Current Assignment Report</h2>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Active
          </Badge>
        </div>

        {currentShip ? (
          <div className="space-y-6">
            {/* Report Filters for Current Ship */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate Report - {currentShip.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Month</label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                          <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                            {new Date(2024, month - 1).toLocaleDateString('en-US', { month: 'long' })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export PDF
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Export XLSX
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Ship Information */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ship className="h-5 w-5 text-blue-600" />
                  {currentShip.name}
                </CardTitle>
                <CardDescription>
                  {currentShip.type} • IMO: {currentShip.imo} • Captain: {currentShip.captain}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Current Status</div>
                    <Badge className={getStatusColor(currentShipAnalysis?.currentStatus)}>
                      {currentShipAnalysis?.currentStatus || "Unknown"}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Last Analysis</div>
                    <div className="text-sm">{currentShipAnalysis?.lastAnalysisDate || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Active Alerts</div>
                    <div className="text-sm text-red-600 font-medium">{currentShipAnalysis?.alerts?.length || 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="text-sm">{currentShip.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Ship Monthly Report */}
            <MonthlyReportCard 
              selectedShip={currentShip.id}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              shipName={currentShip.name}
            />

            {/* Current Alerts */}
            {currentShipAnalysis?.alerts && currentShipAnalysis.alerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    Current Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentShipAnalysis.alerts.map((alert, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-red-800">{alert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
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

      {/* Historical Ships Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Historical Ship Reports</h2>
            <Badge variant="secondary">
              {historicalShips.length} past assignments
            </Badge>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowHistoricalShips(!showHistoricalShips)}
            className="flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            {showHistoricalShips ? 'Hide Historical Reports' : 'Show Historical Reports'}
          </Button>
        </div>

        {showHistoricalShips && (
          <div className="space-y-6">
            {historicalShips.length > 0 ? (
              <>
                {/* Historical Ship Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Select Historical Assignment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 items-end">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Historical Ship</label>
                        <Select value={selectedHistoricalShip} onValueChange={setSelectedHistoricalShip}>
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select a ship from history" />
                          </SelectTrigger>
                          <SelectContent>
                            {historicalShips.map(ship => {
                              const assignment = technician.assignmentHistory.find(a => a.shipId === ship!.id)
                              return (
                                <SelectItem key={ship!.id} value={ship!.id}>
                                  {ship!.name} ({assignment ? `${formatDate(assignment.startDate)} - ${formatDate(assignment.endDate!)}` : ''})
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Month</label>
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                              <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                                {new Date(2024, month - 1).toLocaleDateString('en-US', { month: 'long' })}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Year</label>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Historical Ship Report */}
                {selectedHistoricalShip && reportShip && (
                  <>
                    <Card className="opacity-75">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Ship className="h-5 w-5 text-gray-600" />
                          {reportShip.name} (Historical)
                        </CardTitle>
                        <CardDescription>
                          {reportShip.type} • IMO: {reportShip.imo} • 
                          Assignment: {(() => {
                            const assignment = technician.assignmentHistory.find(a => a.shipId === selectedHistoricalShip)
                            return assignment && assignment.endDate 
                              ? `${formatDate(assignment.startDate)} - ${formatDate(assignment.endDate)}`
                              : 'N/A'
                          })()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Assignment Status</div>
                            <Badge variant="outline" className="text-gray-600">
                              Completed
                            </Badge>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Duration</div>
                            <div className="text-sm">
                              {(() => {
                                const assignment = technician.assignmentHistory.find(a => a.shipId === selectedHistoricalShip)
                                if (assignment && assignment.endDate) {
                                  const months = Math.ceil((new Date(assignment.endDate).getTime() - new Date(assignment.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
                                  return `${months} months`
                                }
                                return 'N/A'
                              })()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Report Period</div>
                            <div className="text-sm">
                              {new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Export</div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">PDF</Button>
                              <Button size="sm" variant="outline">XLSX</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <MonthlyReportCard 
                      selectedShip={selectedHistoricalShip}
                      selectedMonth={selectedMonth}
                      selectedYear={selectedYear}
                      shipName={reportShip.name}
                    />
                  </>
                )}
              </>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No historical assignments to show reports for</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
