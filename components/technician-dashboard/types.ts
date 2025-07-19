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
  lastChemicalAddition: string
  analyses: {
    nitrite: { value: number; target: string; status: string; unit: string }
    chloride: { value: number; target: string; status: string; unit: string }
    pH: { value: number; target: string; status: string; unit: string }
    totalHardness: { value: number; target: string; status: string; unit: string }
  }
  alerts: string[]
}

export interface Technician {
  id: string
  name: string
  email: string
  currentShip: string
}
