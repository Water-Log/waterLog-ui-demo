"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, XCircle, Plus, Save, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  technicians, 
  waterAnalysisData, 
  ships, 
  generateAIComment,
  aiComments 
} from "@/lib/mock-data"

// Mock current technician (in a real app, this would come from authentication)
const currentTechnician = technicians[0] // John Smith

interface WaterAnalysisForm {
  date: Date
  nitrite: string
  chloride: string
  pH: string
  totalHardness: string
  notes: string
}

interface AnalysisResult {
  parameter: string
  value: number
  target: string
  status: string
  unit: string
  aiComment: string
  recommendation: string
}

export default function WaterAnalysisPage() {
  const [form, setForm] = useState<WaterAnalysisForm>({
    date: new Date(),
    nitrite: "",
    chloride: "",
    pH: "",
    totalHardness: "",
    notes: ""
  })
  
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Get current ship information
  const currentShip = ships.find(ship => ship.id === currentTechnician.currentShip)
  const currentShipAnalysis = waterAnalysisData[currentTechnician.currentShip as keyof typeof waterAnalysisData]

  const getParameterStatus = (parameter: string, value: number) => {
    switch (parameter) {
      case 'nitrite':
        if (value < 1000) return 'low'
        if (value > 2400) return 'high'
        return 'optimal'
      case 'chloride':
        if (value > 100) return 'critical'
        if (value > 50) return 'high'
        return 'normal'
      case 'pH':
        if (value < 8.3) return 'low'
        if (value > 10) return 'high'
        return 'good'
      case 'totalHardness':
        if (value > 200) return 'critical'
        if (value > 180) return 'high'
        return 'acceptable'
      default:
        return 'normal'
    }
  }

  const getParameterTarget = (parameter: string) => {
    switch (parameter) {
      case 'nitrite':
        return "1000-2400"
      case 'chloride':
        return "Max: 50"
      case 'pH':
        return "8.3-10"
      case 'totalHardness':
        return "Max: 180"
      default:
        return ""
    }
  }

  const getParameterUnit = (parameter: string) => {
    switch (parameter) {
      case 'nitrite':
        return "ppm"
      case 'chloride':
        return "ppm"
      case 'pH':
        return ""
      case 'totalHardness':
        return "ppm CaCO3"
      default:
        return ""
    }
  }

  const getRecommendation = (parameter: string, status: string, value: number) => {
    const recommendations: Record<string, Record<string, string>> = {
      nitrite: {
        low: "Add nitrite-based inhibitor immediately. Increase chemical dosing by 20-30%. Monitor daily until optimal range is reached.",
        optimal: "Maintain current chemical treatment schedule. Continue routine monitoring every 2 days.",
        high: "Reduce chemical dosing by 15-20%. Check system for overtreatment. Monitor for system efficiency."
      },
      chloride: {
        normal: "Continue routine monitoring. Check for any signs of seawater ingress during next inspection.",
        high: "Inspect all seals and connections. Consider fresh water dilution if possible. Monitor daily.",
        critical: "IMMEDIATE ACTION: Stop operations if safe to do so. Inspect entire cooling water system for seawater contamination. Replace contaminated water."
      },
      pH: {
        low: "Add alkaline treatment (sodium hydroxide or equivalent). Increase pH gradually to avoid system shock.",
        good: "Maintain current treatment. pH levels are optimal for corrosion protection.",
        high: "Consider dilution with fresh water. Reduce alkaline chemical additions. Monitor scale formation risk."
      },
      totalHardness: {
        acceptable: "Continue current water treatment program. Schedule routine descaling as per maintenance schedule.",
        high: "Consider water softening treatment. Monitor heat exchanger efficiency. Plan early descaling maintenance.",
        critical: "URGENT: Implement water softening immediately. Schedule emergency descaling. Check system performance."
      }
    }

    return recommendations[parameter]?.[status] || "Continue monitoring parameter levels."
  }

  const analyzeWaterSample = () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const analysisResults: AnalysisResult[] = []
      
      const parameters = [
        { name: 'nitrite', value: parseFloat(form.nitrite) },
        { name: 'chloride', value: parseFloat(form.chloride) },
        { name: 'pH', value: parseFloat(form.pH) },
        { name: 'totalHardness', value: parseFloat(form.totalHardness) }
      ]

      parameters.forEach(param => {
        if (!isNaN(param.value)) {
          const status = getParameterStatus(param.name, param.value)
          const target = getParameterTarget(param.name)
          const unit = getParameterUnit(param.name)
          const aiComment = generateAIComment(param.name, param.value, status)
          const recommendation = getRecommendation(param.name, status, param.value)

          analysisResults.push({
            parameter: param.name,
            value: param.value,
            target,
            status,
            unit,
            aiComment,
            recommendation
          })
        }
      })

      setResults(analysisResults)
      setIsAnalyzing(false)
    }, 2000)
  }

  const saveAnalysis = () => {
    setIsSaving(true)
    
    // Simulate save delay
    setTimeout(() => {
      // In a real app, this would save to backend
      console.log("Analysis saved:", { form, results })
      setIsSaving(false)
      
      // Reset form
      setForm({
        date: new Date(),
        nitrite: "",
        chloride: "",
        pH: "",
        totalHardness: "",
        notes: ""
      })
      setResults([])
    }, 1000)
  }

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

  const canAnalyze = form.nitrite && form.chloride && form.pH && form.totalHardness
  const hasResults = results.length > 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Water Analysis</h1>
        <p className="text-muted-foreground">
          Enter new water analysis data and receive AI-powered insights
        </p>
      </div>

      {/* Current Ship Info */}
      {currentShip && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Current Assignment
              <Badge variant="outline">{currentShipAnalysis?.currentStatus}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium">{currentShip.name}</p>
                <p className="text-muted-foreground">{currentShip.type}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">{currentShip.location}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Analysis</p>
                <p className="font-medium">{currentShipAnalysis?.lastAnalysisDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Next Due</p>
                <p className="font-medium">{currentShipAnalysis?.nextAnalysisDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Data Entry Form */}
        <Card>
          <CardHeader>
            <CardTitle>New Water Analysis Entry</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter the water analysis parameters for AI evaluation
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Analysis Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.date ? format(form.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.date}
                    onSelect={(date) => setForm(prev => ({ ...prev, date: date || new Date() }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Parameter Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nitrite">Nitrite (ppm)</Label>
                <Input
                  id="nitrite"
                  type="number"
                  placeholder="1000-2400"
                  value={form.nitrite}
                  onChange={(e) => setForm(prev => ({ ...prev, nitrite: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chloride">Chloride (ppm)</Label>
                <Input
                  id="chloride"
                  type="number"
                  placeholder="Max: 50"
                  value={form.chloride}
                  onChange={(e) => setForm(prev => ({ ...prev, chloride: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pH">pH Level</Label>
                <Input
                  id="pH"
                  type="number"
                  step="0.1"
                  placeholder="8.3-10"
                  value={form.pH}
                  onChange={(e) => setForm(prev => ({ ...prev, pH: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalHardness">Total Hardness (ppm CaCO3)</Label>
                <Input
                  id="totalHardness"
                  type="number"
                  placeholder="Max: 180"
                  value={form.totalHardness}
                  onChange={(e) => setForm(prev => ({ ...prev, totalHardness: e.target.value }))}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any observations, unusual conditions, or comments..."
                value={form.notes}
                onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            {/* Analyze Button */}
            <Button 
              onClick={analyzeWaterSample}
              disabled={!canAnalyze || isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Analyze Water Sample
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Analysis Results */}
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
                    onClick={saveAnalysis}
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
      </div>
    </div>
  )
}
