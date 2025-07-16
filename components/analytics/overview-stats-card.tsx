import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, CheckCircle, AlertTriangle } from "lucide-react"
import { fleets } from "@/lib/mock-data"

interface OverviewStatsCardProps {
  allFleetsSummary: any[]
}

export const OverviewStatsCard = ({ allFleetsSummary }: OverviewStatsCardProps) => (
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
)
