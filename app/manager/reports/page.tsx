"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, Ship, AlertCircle } from "lucide-react"
import { useState } from "react"
import { 
  ships, 
  fleets,
  waterAnalysisData
} from "@/lib/mock-data"
import { MonthlyReportCard } from "@/components/reports/monthly-report-card"

export default function ManagerReportsPage() {
  const [selectedShip, setSelectedShip] = useState<string>("1")
  const [selectedMonth, setSelectedMonth] = useState<string>("07")
  const [selectedYear, setSelectedYear] = useState<string>("2024")
  
  const ship = ships.find(s => s.id === selectedShip)
  const fleet = fleets.find(f => f.id === ship?.fleetId)
  const currentAnalysis = waterAnalysisData[selectedShip as keyof typeof waterAnalysisData]
  
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
      <MonthlyReportCard 
        selectedShip={selectedShip}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        shipName={ship?.name || "Unknown Ship"}
      />

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
