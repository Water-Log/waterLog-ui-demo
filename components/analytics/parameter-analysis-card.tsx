import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface ParameterAnalysisCardProps {
  selectedParameter: string
  setSelectedParameter: (value: string) => void
  parameterTrends: any[]
}

export const ParameterAnalysisCard = ({ selectedParameter, setSelectedParameter, parameterTrends }: ParameterAnalysisCardProps) => (
  <div className="space-y-4">
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
  </div>
)
