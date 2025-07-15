"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Calendar, Ship, AlertCircle } from "lucide-react"
import { useState } from "react"
import { 
  ships, 
  fleets,
  generateMonthlyReport,
  generateAIComment,
  historicalWaterAnalysisData,
  waterAnalysisData
} from "@/lib/mock-data"

export default function ManagerReportsPage() {
  const [selectedShip, setSelectedShip] = useState<string>("1")
  const [selectedMonth, setSelectedMonth] = useState<string>("07")
  const [selectedYear, setSelectedYear] = useState<string>("2024")
  
  const ship = ships.find(s => s.id === selectedShip)
  const fleet = fleets.find(f => f.id === ship?.fleetId)
  const reportData = generateMonthlyReport(selectedShip, selectedMonth, selectedYear)
  const currentAnalysis = waterAnalysisData[selectedShip as keyof typeof waterAnalysisData]
  
  const getDayColor = (value: number | null, parameter: string) => {
    if (!value) return "bg-gray-50"
    
    switch (parameter) {
      case "nitrite":
        if (value >= 1000 && value <= 2400) return "bg-green-100"
        if (value > 2400) return "bg-red-100"
        return "bg-yellow-100"
      case "chloride":
        if (value <= 50) return "bg-green-100"
        if (value > 50 && value <= 80) return "bg-yellow-100"
        return "bg-red-100"
      case "pH":
        if (value >= 8.3 && value <= 10) return "bg-green-100"
        if (value > 10 && value <= 11) return "bg-yellow-100"
        return "bg-red-100"
      case "totalHardness":
        if (value <= 180) return "bg-green-100"
        if (value > 180 && value <= 200) return "bg-yellow-100"
        return "bg-red-100"
      default:
        return "bg-gray-50"
    }
  }
  
  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800"
      case "Attention": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Water Analysis Reports</h1>
        <p className="text-muted-foreground">
          Historical water analysis data with AI insights and recommendations
        </p>
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Monthly Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ship</label>
              <Select value={selectedShip} onValueChange={setSelectedShip}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ships.map(ship => (
                    <SelectItem key={ship.id} value={ship.id}>
                      {ship.name}
                    </SelectItem>
                  ))}
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

      {/* Ship Information */}
      {ship && fleet && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5" />
              {ship.name}
            </CardTitle>
            <CardDescription>
              {ship.type} | {fleet.name} | IMO: {ship.imo} | Captain: {ship.captain}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Current Status</div>
                <Badge className={getStatusColor(currentAnalysis?.currentStatus || "")}>
                  {currentAnalysis?.currentStatus || "Unknown"}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Last Analysis</div>
                <div className="font-medium">{currentAnalysis?.lastAnalysisDate || "N/A"}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
                <div className="font-medium text-red-600">{currentAnalysis?.alerts?.length || 0}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">{ship.location}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Analysis Report */}
      {reportData && (
        <Card>
          <CardHeader>
            <CardTitle>
              Monthly Water Analysis Report - {new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <CardDescription>
              Historical water analysis data with AI insights for {reportData.shipName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full border-collapse border border-gray-300 text-xs">
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-gray-300 font-bold text-xs sticky left-0 bg-white z-10 min-w-[140px]">Parameter</TableHead>
                    {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                      <TableHead key={day} className="border border-gray-300 text-center font-bold text-xs w-[30px] p-1">
                        {day}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Nitrite Row */}
                  <TableRow>
                    <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-white z-10 p-2">Nitrite (ppm)</TableCell>
                    {Array.from({length: 31}, (_, i) => {
                      const dayData = reportData.data.find(d => d.day === i + 1)
                      return (
                        <TableCell key={i + 1} className={`border border-gray-300 text-center text-xs p-1 ${getDayColor(dayData?.nitrite || null, "nitrite")}`}>
                          {dayData?.nitrite || ""}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  
                  {/* Chemical Addition Row */}
                  <TableRow>
                    <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-white z-10 p-2">Rocor NB Liquid (Lt)</TableCell>
                    {Array.from({length: 31}, (_, i) => {
                      const dayData = reportData.data.find(d => d.day === i + 1)
                      return (
                        <TableCell key={i + 1} className="border border-gray-300 text-center text-xs p-1">
                          {dayData?.chemicalAddition || ""}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  
                  {/* AI Comments Row */}
                  <TableRow>
                    <TableCell className="border border-gray-300 font-medium text-red-600 text-xs sticky left-0 bg-white z-10 p-2">AI Comments</TableCell>
                    <TableCell colSpan={31} className="border border-gray-300 text-xs text-red-600 p-2">
                      {currentAnalysis ? generateAIComment("nitrite", currentAnalysis.analyses.nitrite.value, currentAnalysis.analyses.nitrite.status) : ""}
                    </TableCell>
                  </TableRow>
                  
                  {/* Spacer Row */}
                  <TableRow>
                    <TableCell colSpan={32} className="border-0 h-2"></TableCell>
                  </TableRow>
                  
                  {/* Chloride Row */}
                  <TableRow>
                    <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-white z-10 p-2">Chloride (ppm)</TableCell>
                    {Array.from({length: 31}, (_, i) => {
                      const dayData = reportData.data.find(d => d.day === i + 1)
                      return (
                        <TableCell key={i + 1} className={`border border-gray-300 text-center text-xs p-1 ${getDayColor(dayData?.chloride || null, "chloride")}`}>
                          {dayData?.chloride || ""}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  
                  {/* AI Comments Row */}
                  <TableRow>
                    <TableCell className="border border-gray-300 font-medium text-red-600 text-xs sticky left-0 bg-white z-10 p-2">AI Comments</TableCell>
                    <TableCell colSpan={31} className="border border-gray-300 text-xs text-red-600 p-2">
                      {currentAnalysis ? generateAIComment("chloride", currentAnalysis.analyses.chloride.value, currentAnalysis.analyses.chloride.status) : ""}
                    </TableCell>
                  </TableRow>
                  
                  {/* Spacer Row */}
                  <TableRow>
                    <TableCell colSpan={32} className="border-0 h-2"></TableCell>
                  </TableRow>
                  
                  {/* pH Row */}
                  <TableRow>
                    <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-white z-10 p-2">pH</TableCell>
                    {Array.from({length: 31}, (_, i) => {
                      const dayData = reportData.data.find(d => d.day === i + 1)
                      return (
                        <TableCell key={i + 1} className={`border border-gray-300 text-center text-xs p-1 ${getDayColor(dayData?.pH || null, "pH")}`}>
                          {dayData?.pH || ""}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  
                  {/* AI Comments Row */}
                  <TableRow>
                    <TableCell className="border border-gray-300 font-medium text-red-600 text-xs sticky left-0 bg-white z-10 p-2">AI Comments</TableCell>
                    <TableCell colSpan={31} className="border border-gray-300 text-xs text-red-600 p-2">
                      {currentAnalysis ? generateAIComment("pH", currentAnalysis.analyses.pH.value, currentAnalysis.analyses.pH.status) : ""}
                    </TableCell>
                  </TableRow>
                  
                  {/* Spacer Row */}
                  <TableRow>
                    <TableCell colSpan={32} className="border-0 h-2"></TableCell>
                  </TableRow>
                  
                  {/* Total Hardness Row */}
                  <TableRow>
                    <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-white z-10 p-2">Total Hardness (ppm CaCO₃)</TableCell>
                    {Array.from({length: 31}, (_, i) => {
                      const dayData = reportData.data.find(d => d.day === i + 1)
                      return (
                        <TableCell key={i + 1} className={`border border-gray-300 text-center text-xs p-1 ${getDayColor(dayData?.totalHardness || null, "totalHardness")}`}>
                          {dayData?.totalHardness || ""}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  
                  {/* AI Comments Row */}
                  <TableRow>
                    <TableCell className="border border-gray-300 font-medium text-red-600 text-xs sticky left-0 bg-white z-10 p-2">AI Comments</TableCell>
                    <TableCell colSpan={31} className="border border-gray-300 text-xs text-red-600 p-2">
                      {currentAnalysis ? generateAIComment("totalHardness", currentAnalysis.analyses.totalHardness.value, currentAnalysis.analyses.totalHardness.status) : ""}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Alerts */}
      {currentAnalysis?.alerts && currentAnalysis.alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Current Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentAnalysis.alerts.map((alert, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-800">{alert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
