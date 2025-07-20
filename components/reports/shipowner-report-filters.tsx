"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { Ship } from "@/components/reports/types"

interface ShipownerReportFiltersProps {
  selectedShip: string
  selectedMonth: string
  selectedYear: string
  ships: Ship[]
  onShipChange: (value: string) => void
  onMonthChange: (value: string) => void
  onYearChange: (value: string) => void
}

export function ShipownerReportFilters({
  selectedShip,
  selectedMonth,
  selectedYear,
  ships,
  onShipChange,
  onMonthChange,
  onYearChange
}: ShipownerReportFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generate Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">Ship</label>
            <Select value={selectedShip} onValueChange={onShipChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a ship" />
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
            <Select value={selectedMonth} onValueChange={onMonthChange}>
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
            <Select value={selectedYear} onValueChange={onYearChange}>
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
  )
}
