"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Ship, AlertTriangle, CheckCircle, Clock, ArrowLeft, TrendingUp, Calendar, Beaker, Droplets } from "lucide-react"
import Link from "next/link"
import { ships, waterAnalysisData, historicalWaterAnalysisData, technicians, chemicalAdditions } from "@/lib/mock-data"

interface ShipDetailPageProps {
  params: {
    id: string
  }
}

export default function ShipDetailPage({ params }: ShipDetailPageProps) {
  const shipId = params.id
  const ship = ships.find(s => s.id === shipId)
  const currentAnalysis = waterAnalysisData[shipId as keyof typeof waterAnalysisData]
  const historicalData = historicalWaterAnalysisData[shipId as keyof typeof historicalWaterAnalysisData]

  // Get technician info to verify access
  const technicianId = "tech-001"
  const technician = technicians.find(t => t.id === technicianId)
  
  if (!technician) {
    return <div>Technician not found</div>
  }

  if (!ship) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/technician/ships">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Ships
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <Ship className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ship Not Found</h3>
          <p className="text-gray-500">The requested ship could not be found.</p>
        </div>
      </div>
    )
  }

  // Check if technician has access to this ship (current or historical)
  const hasAccess = technician.currentShip === shipId || 
    technician.assignmentHistory.some(assignment => assignment.shipId === shipId)

  if (!hasAccess) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/technician/ships">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Ships
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 mx-auto text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
          <p className="text-gray-500">You don't have access to this ship's data.</p>
        </div>
      </div>
    )
  }

  const isCurrentShip = technician.currentShip === shipId
  const assignment = technician.assignmentHistory.find(a => a.shipId === shipId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800"
      case "Attention": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getParameterColor = (parameter: string, value: number) => {
    switch (parameter) {
      case "nitrite":
        if (value >= 1000 && value <= 2400) return "text-green-600"
        if (value > 2400) return "text-red-600"
        return "text-yellow-600"
      case "chloride":
        if (value <= 50) return "text-green-600"
        if (value <= 80) return "text-yellow-600"
        return "text-red-600"
      case "pH":
        if (value >= 8.3 && value <= 10) return "text-green-600"
        if (value > 10) return "text-yellow-600"
        return "text-red-600"
      case "totalHardness":
        if (value <= 180) return "text-green-600"
        if (value <= 200) return "text-yellow-600"
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getChemicalAddition = (date: string) => {
    const additions = chemicalAdditions[shipId as keyof typeof chemicalAdditions]
    if (!additions) return null
    
    return additions.find(addition => addition.date === date) || null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/technician/ships">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Ships
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{ship.name}</h1>
            <p className="text-muted-foreground">Water Analysis History</p>
          </div>
        </div>
        <Badge className={isCurrentShip ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
          {isCurrentShip ? "Current Assignment" : "Historical Assignment"}
        </Badge>
      </div>

      {/* Ship Information */}
      <Card className={isCurrentShip ? "border-l-4 border-l-blue-500" : ""}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ship className={`h-6 w-6 ${isCurrentShip ? 'text-blue-600' : 'text-gray-600'}`} />
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

      {/* Current Status (if current ship) */}
      {isCurrentShip && currentAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Current Water Quality Status
              </CardTitle>
              <div className="flex gap-2">
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className={`text-lg font-semibold ${getParameterColor('nitrite', currentAnalysis.analyses.nitrite.value)}`}>
                  {currentAnalysis.analyses.nitrite.value}
                </div>
                <div className="text-xs text-muted-foreground">Nitrite (ppm)</div>
                <Badge variant="outline" className="mt-1 text-xs">
                  {currentAnalysis.analyses.nitrite.status}
                </Badge>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className={`text-lg font-semibold ${getParameterColor('chloride', currentAnalysis.analyses.chloride.value)}`}>
                  {currentAnalysis.analyses.chloride.value}
                </div>
                <div className="text-xs text-muted-foreground">Chloride (ppm)</div>
                <Badge variant="outline" className="mt-1 text-xs">
                  {currentAnalysis.analyses.chloride.status}
                </Badge>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className={`text-lg font-semibold ${getParameterColor('pH', currentAnalysis.analyses.pH.value)}`}>
                  {currentAnalysis.analyses.pH.value}
                </div>
                <div className="text-xs text-muted-foreground">pH Level</div>
                <Badge variant="outline" className="mt-1 text-xs">
                  {currentAnalysis.analyses.pH.status}
                </Badge>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className={`text-lg font-semibold ${getParameterColor('totalHardness', currentAnalysis.analyses.totalHardness.value)}`}>
                  {currentAnalysis.analyses.totalHardness.value}
                </div>
                <div className="text-xs text-muted-foreground">Hardness (ppm)</div>
                <Badge variant="outline" className="mt-1 text-xs">
                  {currentAnalysis.analyses.totalHardness.status}
                </Badge>
              </div>
            </div>

            {/* Current Alerts */}
            {currentAnalysis.alerts && currentAnalysis.alerts.length > 0 && (
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-red-800 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  {currentAnalysis.alerts.length} Active Alert{currentAnalysis.alerts.length > 1 ? 's' : ''}
                </div>
                <div className="space-y-1">
                  {currentAnalysis.alerts.map((alert, index) => (
                    <div key={index} className="text-xs text-red-700">• {alert}</div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Historical Analysis Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Historical Water Analysis Data
          </CardTitle>
          <CardDescription>
            Complete history of water quality measurements and trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          {historicalData && historicalData.history ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Nitrite (ppm)</TableHead>
                    <TableHead className="text-center">Chloride (ppm)</TableHead>
                    <TableHead className="text-center">pH</TableHead>
                    <TableHead className="text-center">Hardness (ppm)</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Chemical Additions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicalData.history.map((entry, index) => {
                    const chemicalData = getChemicalAddition(entry.date)
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {formatDate(entry.date)}
                        </TableCell>
                        <TableCell className={`text-center ${getParameterColor('nitrite', entry.nitrite)}`}>
                          {entry.nitrite}
                        </TableCell>
                        <TableCell className={`text-center ${getParameterColor('chloride', entry.chloride)}`}>
                          {entry.chloride}
                        </TableCell>
                        <TableCell className={`text-center ${getParameterColor('pH', entry.pH)}`}>
                          {entry.pH}
                        </TableCell>
                        <TableCell className={`text-center ${getParameterColor('totalHardness', entry.totalHardness)}`}>
                          {entry.totalHardness}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getStatusColor(entry.status)} variant="outline">
                            {entry.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {chemicalData ? (
                            <div className="text-sm">
                              <div className="font-medium">{chemicalData.amount} {chemicalData.unit}</div>
                              <div className="text-xs text-muted-foreground">{chemicalData.chemical}</div>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">No additions</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">No historical analysis data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
