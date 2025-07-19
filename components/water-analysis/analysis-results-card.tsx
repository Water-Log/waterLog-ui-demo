import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, CheckCircle, XCircle, Minus, Save, RefreshCw } from "lucide-react"

interface AnalysisResult {
  parameter: string
  value: number
  target: string
  status: string
  unit: string
  aiComment: string
  recommendation: string
}

interface AnalysisResultsCardProps {
  results: AnalysisResult[]
  hasResults: boolean
  onSave: () => void
  isSaving: boolean
}

export function AnalysisResultsCard({ results, hasResults, onSave, isSaving }: AnalysisResultsCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'good':
      case 'normal':
      case 'acceptable':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'high':
      case 'low':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'good':
      case 'normal':
      case 'acceptable':
        return 'bg-green-100 text-green-800'
      case 'high':
      case 'low':
        return 'bg-yellow-100 text-yellow-800'
      case 'critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Analysis Results</CardTitle>
        <p className="text-sm text-muted-foreground">
          {hasResults 
            ? "AI-generated insights and recommendations" 
            : "Results will appear here after analysis"
          }
        </p>
      </CardHeader>
      <CardContent>
        {!hasResults ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter water analysis parameters and click "Analyze Water Sample" to get AI insights</p>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <h4 className="font-medium capitalize">
                      {result.parameter === 'totalHardness' ? 'Total Hardness' : result.parameter}
                    </h4>
                  </div>
                  <Badge className={getStatusColor(result.status)}>
                    {result.value}{result.unit} 
                  </Badge>
                </div>
                
                <div className="pl-6 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Target: </span>
                    {result.target} {result.unit}
                  </p>
                  
                  <Alert className="border-blue-200 bg-blue-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="text-sm">AI Comment</AlertTitle>
                    <AlertDescription className="text-sm">
                      {result.aiComment}
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle className="text-sm">Recommendation</AlertTitle>
                    <AlertDescription className="text-sm">
                      {result.recommendation}
                    </AlertDescription>
                  </Alert>
                </div>
                
                {index < results.length - 1 && <Separator />}
              </div>
            ))}

            {/* Save Analysis Button */}
            <div className="pt-4 border-t">
              <Button 
                onClick={onSave}
                disabled={isSaving}
                className="w-full"
                size="lg"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
