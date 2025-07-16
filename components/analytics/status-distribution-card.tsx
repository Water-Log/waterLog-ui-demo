import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface StatusDistributionCardProps {
  statusDistribution: any[]
  allFleetsSummary: any[]
}

export const StatusDistributionCard = ({ 
  statusDistribution, 
  allFleetsSummary
}: StatusDistributionCardProps) => (
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
)
