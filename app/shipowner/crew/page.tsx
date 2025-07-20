"use client"

import { useState } from "react"
import { technicians, ships, fleets, shipOwners, waterAnalysisData, chemicalAdditions, historicalWaterAnalysisData } from "@/lib/mock-data"
import { 
  TechnicianFilters, 
  TechnicianTable, 
  TechnicianHistoryModal,
  Technician,
  WaterAnalysisData,
  ChemicalAdditionData
} from "@/components/crew"

// Assume we're logged in as the first ship owner
const currentShipOwnerId = "owner-1"

export default function CrewPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null)

  // Get the current ship owner
  const currentShipOwner = shipOwners.find(owner => owner.id === currentShipOwnerId)
  
  // Get fleets assigned to this ship owner
  const ownerFleets = currentShipOwner 
    ? fleets.filter(fleet => fleet.shipOwners.includes(currentShipOwnerId))
    : []
  
  // Get ships in these fleets
  const ownerShips = ships.filter(ship => 
    ownerFleets.some(fleet => fleet.shipIds.includes(ship.id))
  )
  
  // Get technicians working on these ships
  const relevantTechnicians = technicians.filter(tech => 
    ownerShips.some(ship => ship.id === tech.currentShip) ||
    tech.assignmentHistory.some(assignment => 
      ownerShips.some(ship => ship.id === assignment.shipId)
    )
  )

  // Apply filters
  const filteredTechnicians = relevantTechnicians.filter(tech => {
    const matchesSearch = 
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || tech.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesDepartment = departmentFilter === "all" || tech.department.toLowerCase() === departmentFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesDepartment
  })

  // Get unique departments and statuses for filtering
  const departments = [...new Set(relevantTechnicians.map(tech => tech.department))]
  const statuses = [...new Set(relevantTechnicians.map(tech => tech.status))]

  // Get ship name from ship ID
  const getShipName = (shipId: string) => {
    const ship = ships.find(s => s.id === shipId)
    return ship ? ship.name : "Unknown Ship"
  }

  // Get water analysis data for a technician
  const getWaterAnalysisForTechnician = (technician: Technician): WaterAnalysisData[] => {
    const result: WaterAnalysisData[] = []
    
    // Get all ships the technician has worked on
    const shipIds = [
      technician.currentShip,
      ...technician.assignmentHistory.map(a => a.shipId)
    ]
    
    // De-duplicate ship IDs
    const uniqueShipIds = [...new Set(shipIds)]
    
    // Get water analysis data for each ship
    uniqueShipIds.forEach(shipId => {
      const shipData = historicalWaterAnalysisData[shipId as keyof typeof historicalWaterAnalysisData]
      if (shipData) {
        shipData.history.forEach((entry: { date: string; nitrite: number; chloride: number; pH: number; totalHardness: number; status: string }) => {
          result.push({
            date: entry.date,
            shipId: shipId,
            shipName: getShipName(shipId),
            nitrite: entry.nitrite,
            chloride: entry.chloride,
            pH: entry.pH,
            totalHardness: entry.totalHardness,
            status: entry.status
          })
        })
      }
    })
    
    // Sort by date (most recent first)
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  
  // Get chemical additions data for a technician
  const getChemicalAdditionsForTechnician = (technician: Technician): ChemicalAdditionData[] => {
    const result: ChemicalAdditionData[] = []
    
    // Get all ships the technician has worked on
    const shipIds = [
      technician.currentShip,
      ...technician.assignmentHistory.map(a => a.shipId)
    ]
    
    // De-duplicate ship IDs
    const uniqueShipIds = [...new Set(shipIds)]
    
    // Get chemical additions data for each ship
    uniqueShipIds.forEach(shipId => {
      const additions = chemicalAdditions[shipId as keyof typeof chemicalAdditions]
      if (additions) {
        additions.forEach(addition => {
          result.push({
            date: addition.date,
            shipId: shipId,
            chemical: addition.chemical,
            amount: addition.amount,
            unit: addition.unit
          })
        })
      }
    })
    
    // Sort by date (most recent first)
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crew Management</h1>
          <p className="text-muted-foreground">
            Manage technicians working on your fleet's ships
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <TechnicianFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        departmentFilter={departmentFilter}
        onDepartmentFilterChange={setDepartmentFilter}
        statuses={statuses}
        departments={departments}
      />

      {/* Technicians Table */}
      <TechnicianTable
        technicians={filteredTechnicians}
        getShipName={getShipName}
        onViewHistory={(technician) => {
          setSelectedTechnician(technician);
          setHistoryModalOpen(true);
        }}
      />

      {/* Technician History Modal */}
      <TechnicianHistoryModal
        open={historyModalOpen}
        onOpenChange={setHistoryModalOpen}
        technician={selectedTechnician}
        getShipName={getShipName}
        getWaterAnalysisForTechnician={getWaterAnalysisForTechnician}
        getChemicalAdditionsForTechnician={getChemicalAdditionsForTechnician}
      />
    </div>
  )
}
