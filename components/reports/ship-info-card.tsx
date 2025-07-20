"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ship as ShipIcon } from "lucide-react"
import { Ship, WaterAnalysisData } from "./types"

interface ShipInfoCardProps {
  ship: Ship
  shipAnalysis?: WaterAnalysisData
}

export function ShipInfoCard({ ship, shipAnalysis }: ShipInfoCardProps) {
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800"
      case "Attention": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShipIcon className="h-5 w-5 text-blue-600" />
          {ship.name}
        </CardTitle>
        <CardDescription>
          {ship.type} • IMO: {ship.imo} • Captain: {ship.captain}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Current Status</div>
            <Badge className={getStatusColor(shipAnalysis?.currentStatus)}>
              {shipAnalysis?.currentStatus || "Unknown"}
            </Badge>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Last Analysis</div>
            <div className="text-sm">{shipAnalysis?.lastAnalysisDate || "N/A"}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Active Alerts</div>
            <div className="text-sm text-red-600 font-medium">{shipAnalysis?.alerts?.length || 0}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Location</div>
            <div className="text-sm">{ship.location}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
