import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Calendar } from "lucide-react"

interface HistoricalAnalysisData {
  history: Array<{
    date: string
    nitrite: number
    chloride: number
    pH: number
    totalHardness: number
    status: string
  }>
}

interface ChemicalAddition {
  date: string
  amount: number
  unit: string
  chemical: string
}

interface HistoricalAnalysisTableCardProps {
  historicalData: HistoricalAnalysisData | undefined
  getChemicalAddition: (date: string) => ChemicalAddition | null
}

export function HistoricalAnalysisTableCard({ 
  historicalData, 
  getChemicalAddition 
}: HistoricalAnalysisTableCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800"
      case "Attention": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Historical Water Analysis Data
        </CardTitle>
        <CardDescription>
          Complete history of water quality measurements and trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        {historicalData && historicalData.history ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Nitrite (ppm)</TableHead>
                  <TableHead className="text-center">Chloride (ppm)</TableHead>
                  <TableHead className="text-center">pH</TableHead>
                  <TableHead className="text-center">Hardness (ppm)</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Chemical Additions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalData.history.map((entry, index) => {
                  const chemicalData = getChemicalAddition(entry.date)
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {formatDate(entry.date)}
                      </TableCell>
                      <TableCell className={`text-center ${getParameterColor('nitrite', entry.nitrite)}`}>
                        {entry.nitrite}
                      </TableCell>
                      <TableCell className={`text-center ${getParameterColor('chloride', entry.chloride)}`}>
                        {entry.chloride}
                      </TableCell>
                      <TableCell className={`text-center ${getParameterColor('pH', entry.pH)}`}>
                        {entry.pH}
                      </TableCell>
                      <TableCell className={`text-center ${getParameterColor('totalHardness', entry.totalHardness)}`}>
                        {entry.totalHardness}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(entry.status)} variant="outline">
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {chemicalData ? (
                          <div className="text-sm">
                            <div className="font-medium">{chemicalData.amount} {chemicalData.unit}</div>
                            <div className="text-xs text-muted-foreground">{chemicalData.chemical}</div>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">No additions</span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">No historical analysis data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
