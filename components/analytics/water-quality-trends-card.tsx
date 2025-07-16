import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { fleets } from "@/lib/mock-data"

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
} satisfies ChartConfig

interface WaterQualityTrendsCardProps {
  selectedFleet: string
  setSelectedFleet: (value: string) => void
  fleetTrends: any[]
}

export const WaterQualityTrendsCard = ({ selectedFleet, setSelectedFleet, fleetTrends }: WaterQualityTrendsCardProps) => (
  <div className="space-y-4">
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
            <ResponsiveContainer width="100%" height={200}>
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
  </div>
)
