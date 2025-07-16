"use client"

import { ChartConfig } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { 
  fleets, 
  getFleetHistoricalData, 
  getFleetTrends, 
  getShipParameterTrend,
  getFleetWaterAnalysisSummary,
  historicalWaterAnalysisData,
  waterAnalysisData
} from "@/lib/mock-data"
import { OverviewStatsCard } from "@/components/analytics/overview-stats-card"
import { WaterQualityTrendsCard } from "@/components/analytics/water-quality-trends-card"
import { FleetComparisonCard } from "@/components/analytics/fleet-comparison-card"
import { ParameterAnalysisCard } from "@/components/analytics/parameter-analysis-card"
import { StatusDistributionCard } from "@/components/analytics/status-distribution-card"

const chartConfig = {
  nitrite: {
    label: "Nitrite (ppm)",
    color: "hsl(var(--chart-1))",
  },
  chloride: {
    label: "Chloride (ppm)",
    color: "hsl(var(--chart-2))",
  },
  pH: {
    label: "pH Level",
    color: "hsl(var(--chart-3))",
  },
  totalHardness: {
    label: "Total Hardness (ppm CaCO3)",
    color: "hsl(var(--chart-4))",
  },
  overallStatus: {
    label: "Overall Status",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

const statusColors = {
  Good: "#10b981",
  Attention: "#f59e0b",
  Critical: "#ef4444"
}

export default function ManagerAnalyticsPage() {
  const [selectedFleet, setSelectedFleet] = useState<string>("all")
  const [selectedParameter, setSelectedParameter] = useState<string>("nitrite")
  
  // Get fleet analytics data
  const allFleetsSummary = fleets.map(fleet => {
    const summary = getFleetWaterAnalysisSummary(fleet.id)
    return {
      ...fleet,
      ...summary
    }
  })
  
  // Get trends data
  const fleetTrends = selectedFleet === "all" 
    ? getFleetTrends("1") // Show Pacific Fleet as default when "all" is selected
    : getFleetTrends(selectedFleet)
  
  // Get parameter trends for all ships
  const parameterTrends = Object.keys(historicalWaterAnalysisData).map(shipId => {
    const shipData = historicalWaterAnalysisData[shipId as keyof typeof historicalWaterAnalysisData]
    return {
      shipName: shipData.shipName,
      trend: getShipParameterTrend(shipId, selectedParameter)
    }
  })
  
  // Fleet comparison data
  const fleetComparison = allFleetsSummary.map(fleet => ({
    name: fleet.name,
    Good: fleet.goodCondition,
    Attention: fleet.needsAttention,
    Critical: fleet.critical,
    totalShips: fleet.totalShips,
    totalAlerts: fleet.totalAlerts,
    avgNitrite: fleet.averageAnalyses?.nitrite || 0,
    avgChloride: fleet.averageAnalyses?.chloride || 0,
    avgPH: fleet.averageAnalyses?.pH || 0,
    avgHardness: fleet.averageAnalyses?.totalHardness || 0
  }))
  
  // Status distribution
  const statusDistribution = [
    { 
      name: "Good", 
      value: allFleetsSummary.reduce((sum, fleet) => sum + fleet.goodCondition, 0),
      color: statusColors.Good
    },
    { 
      name: "Attention", 
      value: allFleetsSummary.reduce((sum, fleet) => sum + fleet.needsAttention, 0),
      color: statusColors.Attention
    },
    { 
      name: "Critical", 
      value: allFleetsSummary.reduce((sum, fleet) => sum + fleet.critical, 0),
      color: statusColors.Critical
    }
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <OverviewStatsCard allFleetsSummary={allFleetsSummary} />
          <StatusDistributionCard 
            statusDistribution={statusDistribution} 
            allFleetsSummary={allFleetsSummary}
          />
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <WaterQualityTrendsCard 
            selectedFleet={selectedFleet}
            setSelectedFleet={setSelectedFleet}
            fleetTrends={fleetTrends}
          />
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-4">
          <FleetComparisonCard 
            fleetComparison={fleetComparison}
            allFleetsSummary={allFleetsSummary}
          />
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-4">
          <ParameterAnalysisCard 
            selectedParameter={selectedParameter}
            setSelectedParameter={setSelectedParameter}
            parameterTrends={parameterTrends}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
