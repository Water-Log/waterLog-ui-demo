import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Beaker, AlertTriangle, Droplets } from "lucide-react"
import Link from "next/link"
import { ShipAnalysis } from "./types"

interface CurrentWaterQualityStatusCardProps {
  currentAnalysis: ShipAnalysis
}

export function CurrentWaterQualityStatusCard({ currentAnalysis }: CurrentWaterQualityStatusCardProps) {
  const getParameterColor = (parameter: string, value: number) => {
    switch (parameter) {
      case "nitrite":
        if (value >= 1000 && value <= 2400) return "text-green-600"
        if (value > 2400) return "text-red-600"
        return "text-yellow-600"
      case "chloride":
        if (value <= 50) return "text-green-600"
        if (value <= 80) return "text-yellow-600"
        return "text-red-600"
      case "pH":
        if (value >= 8.3 && value <= 10) return "text-green-600"
        if (value > 10) return "text-yellow-600"
        return "text-red-600"
      case "totalHardness":
        if (value <= 180) return "text-green-600"
        if (value <= 200) return "text-yellow-600"
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Current Water Quality Status
          </CardTitle>
          <div className="flex gap-2">
            <Link href="/technician/water-analysis">
              <Button className="flex items-center gap-2">
                <Beaker className="h-4 w-4" />
                Add Analysis
              </Button>
            </Link>
            <Link href="/technician/chemicals">
              <Button variant="outline" className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                Add Chemicals
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className={`text-lg font-semibold ${getParameterColor('nitrite', currentAnalysis.analyses.nitrite.value)}`}>
              {currentAnalysis.analyses.nitrite.value}
            </div>
            <div className="text-xs text-muted-foreground">Nitrite (ppm)</div>
            <Badge variant="outline" className="mt-1 text-xs">
              {currentAnalysis.analyses.nitrite.status}
            </Badge>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className={`text-lg font-semibold ${getParameterColor('chloride', currentAnalysis.analyses.chloride.value)}`}>
              {currentAnalysis.analyses.chloride.value}
            </div>
            <div className="text-xs text-muted-foreground">Chloride (ppm)</div>
            <Badge variant="outline" className="mt-1 text-xs">
              {currentAnalysis.analyses.chloride.status}
            </Badge>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className={`text-lg font-semibold ${getParameterColor('pH', currentAnalysis.analyses.pH.value)}`}>
              {currentAnalysis.analyses.pH.value}
            </div>
            <div className="text-xs text-muted-foreground">pH Level</div>
            <Badge variant="outline" className="mt-1 text-xs">
              {currentAnalysis.analyses.pH.status}
            </Badge>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className={`text-lg font-semibold ${getParameterColor('totalHardness', currentAnalysis.analyses.totalHardness.value)}`}>
              {currentAnalysis.analyses.totalHardness.value}
            </div>
            <div className="text-xs text-muted-foreground">Hardness (ppm)</div>
            <Badge variant="outline" className="mt-1 text-xs">
              {currentAnalysis.analyses.totalHardness.status}
            </Badge>
          </div>
        </div>

        {/* Current Alerts */}
        {currentAnalysis.alerts && currentAnalysis.alerts.length > 0 && (
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm font-medium text-red-800 mb-2">
              <AlertTriangle className="h-4 w-4" />
              {currentAnalysis.alerts.length} Active Alert{currentAnalysis.alerts.length > 1 ? 's' : ''}
            </div>
            <div className="space-y-1">
              {currentAnalysis.alerts.map((alert, index) => (
                <div key={index} className="text-xs text-red-700">• {alert}</div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
