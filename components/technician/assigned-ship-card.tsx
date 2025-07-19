"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ship, AlertTriangle, CheckCircle, Clock, Eye, Plus } from "lucide-react"
import { waterAnalysisData } from "@/lib/mock-data"

interface AssignedShipCardProps {
  ship: {
    id: string
    name: string
    type: string
    imo: string
    flag: string
    status: string
    location: string
    capacity: string
    captain: string
    yearBuilt: number
    lastInspection: string
    nextMaintenance: string
    image: string
    fleetId: string
    technicianId?: string
  }
}

export function AssignedShipCard({ ship }: AssignedShipCardProps) {
  const analysis = waterAnalysisData[ship.id as keyof typeof waterAnalysisData]
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800"
      case "Attention": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Good": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Attention": return <Clock className="h-4 w-4 text-yellow-600" />
      case "Critical": return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Ship className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Ship className="h-5 w-5" />
              {ship.name}
            </CardTitle>
            <CardDescription>
              {ship.type} | IMO: {ship.imo}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(analysis?.currentStatus || "Unknown")}>
            {analysis?.currentStatus || "Unknown"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Ship Details */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Captain:</span>
            <div className="font-medium">{ship.captain}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Location:</span>
            <div className="font-medium">{ship.location}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Flag:</span>
            <div className="font-medium">{ship.flag}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Capacity:</span>
            <div className="font-medium">{ship.capacity}</div>
          </div>
        </div>

        {/* Water Analysis Status */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Water Analysis Status</span>
            {getStatusIcon(analysis?.currentStatus || "Unknown")}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Last Analysis:</span>
              <div className="font-medium">{analysis?.lastAnalysisDate || "N/A"}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Alerts:</span>
              <div className="font-medium text-red-600">
                {analysis?.alerts?.length || 0}
              </div>
            </div>
          </div>
          
          {/* Active Alerts */}
          {analysis?.alerts && analysis.alerts.length > 0 && (
            <div className="mt-2">
              <div className="text-xs text-muted-foreground mb-1">Active Alerts:</div>
              <div className="space-y-1">
                {analysis.alerts.slice(0, 2).map((alert, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs bg-red-50 p-2 rounded">
                    <AlertTriangle className="h-3 w-3 text-red-500" />
                    <span className="text-red-700 truncate">{alert}</span>
                  </div>
                ))}
                {analysis.alerts.length > 2 && (
                  <div className="text-xs text-muted-foreground text-center">
                    +{analysis.alerts.length - 2} more alerts
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Button size="sm" className="flex-1 flex items-center gap-2">
            <Plus className="h-3 w-3" />
            Add Analysis
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Eye className="h-3 w-3" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
