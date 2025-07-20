"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { WaterAnalysisData, Fleet } from "./types"

interface FleetAnalysisSummaryCardProps {
  fleet: Fleet
  fleetShipsData: WaterAnalysisData[]
}

export function FleetAnalysisSummaryCard({ fleet, fleetShipsData }: FleetAnalysisSummaryCardProps) {
  // Calculate fleet statistics
  const goodCount = fleetShipsData.filter(s => s.currentStatus === "Good").length
  const attentionCount = fleetShipsData.filter(s => s.currentStatus === "Attention").length
  const criticalCount = fleetShipsData.filter(s => s.currentStatus === "Critical").length
  
  const totalAlerts = fleetShipsData.reduce((sum, ship) => 
    sum + (ship.alerts?.length || 0), 0)
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium text-lg mb-4">{fleet.name}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Status Distribution</div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-800">
                Good: {goodCount}
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800">
                Attention: {attentionCount}
              </Badge>
              <Badge className="bg-red-100 text-red-800">
                Critical: {criticalCount}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Active Alerts</div>
              <div className="text-2xl font-bold text-red-600">{totalAlerts}</div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}
