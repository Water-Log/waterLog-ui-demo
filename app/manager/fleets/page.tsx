"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Building2, 
  CheckCircle, 
  Clock,
  AlertTriangle
} from "lucide-react"
import { fleets, getFleetWaterAnalysisSummary } from "@/lib/mock-data"
import { FleetCard } from "@/app/_components/fleet-card"
import { useState } from "react"

export default function FleetsPage() {
  const [expandedFleets, setExpandedFleets] = useState<Set<string>>(new Set())
  
  const fleetsWithAnalysis = fleets.map(fleet => ({
    ...fleet,
    waterAnalysis: getFleetWaterAnalysisSummary(fleet.id)
  }))

  const toggleFleetExpansion = (fleetId: string) => {
    setExpandedFleets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(fleetId)) {
        newSet.delete(fleetId)
      } else {
        newSet.add(fleetId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fleet Water Analysis</h1>
        <p className="text-muted-foreground">
          Monitor cooling water analysis across all fleets for optimal ship performance
        </p>
      </div>

      {/* Fleet Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fleets</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetsWithAnalysis.length}</div>
            <p className="text-xs text-muted-foreground">
              Active fleets under monitoring
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ships in Good Condition</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {fleetsWithAnalysis.reduce((sum, fleet) => sum + fleet.waterAnalysis.goodCondition, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Optimal water parameters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {fleetsWithAnalysis.reduce((sum, fleet) => sum + fleet.waterAnalysis.needsAttention, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Minor adjustments needed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {fleetsWithAnalysis.reduce((sum, fleet) => sum + fleet.waterAnalysis.critical, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Immediate action required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Details */}
      <div className="grid gap-6">
        {fleetsWithAnalysis.map((fleet) => (
          <FleetCard
            key={fleet.id}
            fleet={fleet}
            waterAnalysis={fleet.waterAnalysis}
            showWaterAnalysis={true}
            isExpanded={expandedFleets.has(fleet.id)}
            onToggleExpansion={() => toggleFleetExpansion(fleet.id)}
          />
        ))}
      </div>
    </div>
  )
}
