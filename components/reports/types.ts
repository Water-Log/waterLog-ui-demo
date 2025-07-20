// Types for reports components
export interface Ship {
  id: string
  name: string
  type: string
  imo: string
  flag: string
  status: string
  location: string
  capacity: string
  captain: string
  yearBuilt: number
  lastInspection: string
  nextMaintenance: string
  image: string
  fleetId: string
  technicianId?: string
}

export interface Fleet {
  id: string
  name: string
  company: string
  region: string
  status: string
  createdDate: string
  shipOwners: string[]
  shipIds: string[]
  description: string
  headquarters: string
  totalShips: number
  activeVoyages: number
}

export interface ShipOwner {
  id: string
  name: string
  email: string
  phone: string
  nationality: string
  licenseNumber: string
  experience: string
  specialization: string
  assignedFleets: string[]
  status: string
  joinDate: string
}

export interface WaterAnalysisData {
  shipId: string
  shipName: string
  fleetId: string
  lastAnalysisDate: string
  currentStatus: string
  alerts: string[]
  analyses: {
    nitrite: {
      value: number
      target: string
      status: string
      unit: string
    }
    chloride: {
      value: number
      target: string
      status: string
      unit: string
    }
    pH: {
      value: number
      target: string
      status: string
      unit: string
    }
    totalHardness: {
      value: number
      target: string
      status: string
      unit: string
    }
  }
  lastChemicalAddition: string
  nextAnalysisDate: string
}
