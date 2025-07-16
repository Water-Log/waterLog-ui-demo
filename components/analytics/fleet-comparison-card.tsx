import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const chartConfig = {
  nitrite: {
    label: "Nitrite (ppm)",
    color: "hsl(var(--chart-1))",
  },
  chloride: {
    label: "Chloride (ppm)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const statusColors = {
  Good: "#10b981",
  Attention: "#f59e0b",
  Critical: "#ef4444"
}

interface FleetComparisonCardProps {
  fleetComparison: any[]
  allFleetsSummary: any[]
}

export const FleetComparisonCard = ({ fleetComparison, allFleetsSummary }: FleetComparisonCardProps) => (
  <div className="space-y-4">
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
  </div>
)
