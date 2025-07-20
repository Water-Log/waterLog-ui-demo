// Technician data interfaces
export interface Technician {
  id: string
  name: string
  email: string
  phone: string
  department: string
  status: string
  hiredDate: string
  certifications: string[]
  currentShip: string
  assignmentHistory: {
    shipId: string
    shipName: string
    startDate: string
    endDate: string | null
  }[]
  experience: string
  location: string
}

// Water analysis data interface
export interface WaterAnalysisData {
  date: string
  shipId: string
  shipName: string
  nitrite: number
  chloride: number
  pH: number
  totalHardness: number
  status: string
}

// Chemical additions data interface
export interface ChemicalAdditionData {
  date: string
  shipId: string
  chemical: string
  amount: number
  unit: string
}
