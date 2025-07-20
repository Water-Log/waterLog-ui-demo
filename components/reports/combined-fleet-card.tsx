"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { WaterAnalysisData, Fleet } from "./types"

interface CombinedFleetCardProps {
  fleet: Fleet
  fleetShipsData: WaterAnalysisData[]
}

export function CombinedFleetCard({ fleet, fleetShipsData }: CombinedFleetCardProps) {
  // Calculate fleet statistics
  const goodCount = fleetShipsData.filter(s => s.currentStatus === "Good").length
  const attentionCount = fleetShipsData.filter(s => s.currentStatus === "Attention").length
  const criticalCount = fleetShipsData.filter(s => s.currentStatus === "Critical").length
  
  const totalAlerts = fleetShipsData.reduce((sum, ship) => 
    sum + (ship.alerts?.length || 0), 0)
  
  return (
    <Card>
      <CardContent className="pt-6">
        {/* Basic Fleet Info Section */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="font-medium text-lg">{fleet.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Region: {fleet.region} • Ships: {fleet.shipIds.length}
            </div>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {fleet.status}
          </Badge>
        </div>

        {/* Separator */}
        <div className="h-px bg-gray-100 my-4"></div>
        
        {/* Fleet Analysis Section */}
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
