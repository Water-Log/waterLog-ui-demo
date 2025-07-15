"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart
} from "recharts"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Ship,
  Droplets,
  Activity,
  BarChart3
} from "lucide-react"
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
  
  // Get trends for selected fleet or all fleets
  const fleetTrends = selectedFleet === "all" 
    ? getFleetTrends("1") // Show Pacific Fleet as default
    : getFleetTrends(selectedFleet)
  
  // Get parameter trends across all ships
  const parameterTrends = Object.keys(historicalWaterAnalysisData).map(shipId => {
    const shipData = historicalWaterAnalysisData[shipId as keyof typeof historicalWaterAnalysisData]
    return {
      shipName: shipData.shipName,
      trend: getShipParameterTrend(shipId, selectedParameter)
    }
  })
  
  // Overall fleet status distribution
  const statusDistribution = [
    { name: "Good", value: allFleetsSummary.reduce((sum, fleet) => sum + fleet.goodCondition, 0), color: statusColors.Good },
    { name: "Attention", value: allFleetsSummary.reduce((sum, fleet) => sum + fleet.needsAttention, 0), color: statusColors.Attention },
    { name: "Critical", value: allFleetsSummary.reduce((sum, fleet) => sum + fleet.critical, 0), color: statusColors.Critical }
  ]
  
  // Fleet comparison data
  const fleetComparison = allFleetsSummary.map(fleet => ({
    name: fleet.name,
    Good: fleet.goodCondition,
    Attention: fleet.needsAttention,
    Critical: fleet.critical,
    totalShips: fleet.totalShips,
    totalAlerts: fleet.totalAlerts,
    avgNitrite: fleet.averageAnalyses.nitrite,
    avgChloride: fleet.averageAnalyses.chloride,
    avgPH: fleet.averageAnalyses.pH,
    avgHardness: fleet.averageAnalyses.totalHardness
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fleet Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive analytics and insights across all fleets
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ships</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allFleetsSummary.reduce((sum, fleet) => sum + fleet.totalShips, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {fleets.length} fleets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Good Condition</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {allFleetsSummary.reduce((sum, fleet) => sum + fleet.goodCondition, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ships with optimal water quality
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {allFleetsSummary.reduce((sum, fleet) => sum + fleet.needsAttention, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ships requiring monitoring
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
              {allFleetsSummary.reduce((sum, fleet) => sum + fleet.critical, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ships requiring immediate action
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Water Quality Trends</TabsTrigger>
          <TabsTrigger value="fleet-comparison">Fleet Comparison</TabsTrigger>
          <TabsTrigger value="parameters">Parameter Analysis</TabsTrigger>
          <TabsTrigger value="status">Status Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={selectedFleet} onValueChange={setSelectedFleet}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select fleet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fleets</SelectItem>
                {fleets.map(fleet => (
                  <SelectItem key={fleet.id} value={fleet.id}>
                    {fleet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Water Quality Trends</CardTitle>
                <CardDescription>
                  Historical trends for {selectedFleet === "all" ? "Pacific Fleet" : fleets.find(f => f.id === selectedFleet)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={fleetTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="nitrite" 
                        stroke={chartConfig.nitrite.color} 
                        strokeWidth={2}
                        name="Nitrite (ppm)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="chloride" 
                        stroke={chartConfig.chloride.color} 
                        strokeWidth={2}
                        name="Chloride (ppm)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>pH & Hardness Trends</CardTitle>
                <CardDescription>
                  pH levels and total hardness over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={fleetTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="pH" 
                        stroke={chartConfig.pH.color} 
                        strokeWidth={2}
                        name="pH Level"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="totalHardness" 
                        stroke={chartConfig.totalHardness.color} 
                        strokeWidth={2}
                        name="Total Hardness (ppm CaCO3)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fleet-comparison" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Ship Status</CardTitle>
                <CardDescription>
                  Distribution of ship conditions across fleets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={fleetComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Good" fill={statusColors.Good} name="Good" />
                      <Bar dataKey="Attention" fill={statusColors.Attention} name="Attention" />
                      <Bar dataKey="Critical" fill={statusColors.Critical} name="Critical" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Water Parameters</CardTitle>
                <CardDescription>
                  Fleet-wide average water quality parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={fleetComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="avgNitrite" 
                        stackId="1" 
                        stroke={chartConfig.nitrite.color} 
                        fill={chartConfig.nitrite.color}
                        name="Avg Nitrite (ppm)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="avgChloride" 
                        stackId="2" 
                        stroke={chartConfig.chloride.color} 
                        fill={chartConfig.chloride.color}
                        name="Avg Chloride (ppm)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Fleet Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {allFleetsSummary.map(fleet => (
              <Card key={fleet.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{fleet.name}</CardTitle>
                  <Badge variant={
                    fleet.overallStatus === "Good" ? "default" :
                    fleet.overallStatus === "Attention" ? "secondary" : "destructive"
                  }>
                    {fleet.overallStatus}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Ships:</span>
                    <span className="font-medium">{fleet.totalShips}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Good:</span>
                    <span className="font-medium text-green-600">{fleet.goodCondition}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Attention:</span>
                    <span className="font-medium text-amber-600">{fleet.needsAttention}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Critical:</span>
                    <span className="font-medium text-red-600">{fleet.critical}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Alerts:</span>
                    <span className="font-medium">{fleet.totalAlerts}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={selectedParameter} onValueChange={setSelectedParameter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nitrite">Nitrite (ppm)</SelectItem>
                <SelectItem value="chloride">Chloride (ppm)</SelectItem>
                <SelectItem value="pH">pH Level</SelectItem>
                <SelectItem value="totalHardness">Total Hardness (ppm CaCO3)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {parameterTrends.map((ship, index) => (
              <Card key={ship.shipName}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{ship.shipName}</CardTitle>
                  <CardDescription>
                    {selectedParameter.charAt(0).toUpperCase() + selectedParameter.slice(1)} trend
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={ship.trend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={`hsl(${index * 360 / parameterTrends.length}, 70%, 50%)`}
                          strokeWidth={2}
                          name={selectedParameter.charAt(0).toUpperCase() + selectedParameter.slice(1)}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Overall Fleet Status</CardTitle>
                <CardDescription>
                  Distribution of ship conditions across all fleets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Summary</CardTitle>
                <CardDescription>
                  Current alerts across all fleets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allFleetsSummary.map(fleet => (
                    <div key={fleet.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">{fleet.name}</div>
                        <div className="text-sm text-muted-foreground">{fleet.region}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{fleet.totalAlerts} alerts</div>
                        <Badge variant={
                          fleet.overallStatus === "Good" ? "default" :
                          fleet.overallStatus === "Attention" ? "secondary" : "destructive"
                        }>
                          {fleet.overallStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
