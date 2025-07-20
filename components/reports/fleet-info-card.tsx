"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Fleet } from "./types"

interface FleetInfoCardProps {
  fleet: Fleet
}

export function FleetInfoCard({ fleet }: FleetInfoCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-sm font-medium">{fleet.name}</div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-2xl font-bold">{fleet.shipIds.length} Ships</div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {fleet.status}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Region: {fleet.region}
        </div>
      </CardContent>
    </Card>
  )
}
