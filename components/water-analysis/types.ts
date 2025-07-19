export interface WaterAnalysisForm {
  date: Date
  nitrite: string
  chloride: string
  pH: string
  totalHardness: string
  notes: string
}

export interface AnalysisResult {
  parameter: string
  value: number
  target: string
  status: string
  unit: string
  aiComment: string
  recommendation: string
}

export interface Ship {
  id: string
  name: string
  type: string
  location: string
  imo: string
  flag: string
  capacity: string
  captain: string
}

export interface ShipAnalysis {
  currentStatus: string
  lastAnalysisDate: string
  nextAnalysisDate: string
  analyses: {
    nitrite: { value: number; target: string; status: string; unit: string }
    chloride: { value: number; target: string; status: string; unit: string }
    pH: { value: number; target: string; status: string; unit: string }
    totalHardness: { value: number; target: string; status: string; unit: string }
  }
  alerts: string[]
}
