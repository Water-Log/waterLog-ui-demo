"use client"

import { useState } from "react"
import { 
  technicians, 
  waterAnalysisData, 
  ships, 
  generateAIComment 
} from "@/lib/mock-data"
import { CurrentShipInfo, WaterAnalysisFormCard, AnalysisResultsCard } from "@/components/water-analysis"

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

  const canAnalyze = !!(form.nitrite && form.chloride && form.pH && form.totalHardness)
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
        <CurrentShipInfo 
          currentShip={currentShip}
          currentShipAnalysis={currentShipAnalysis}
        />
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Data Entry Form */}
        <WaterAnalysisFormCard
          form={form}
          setForm={setForm}
          onAnalyze={analyzeWaterSample}
          isAnalyzing={isAnalyzing}
          canAnalyze={canAnalyze}
        />

        {/* AI Analysis Results */}
        <AnalysisResultsCard
          results={results}
          hasResults={hasResults}
          onSave={saveAnalysis}
          isSaving={isSaving}
        />
      </div>
    </div>
  )
}
