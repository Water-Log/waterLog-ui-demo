"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ships, waterAnalysisData, technicians } from "@/lib/mock-data"
import {
  CurrentAssignmentCard,
  NoCurrentAssignmentCard,
  AssignmentHistorySection
} from "@/components/ships"

export default function TechnicianShipsPage() {
  // Mock technician data - in real app this would come from authentication
  const technicianId = "tech-001"
  const technician = technicians.find(t => t.id === technicianId)
  
  if (!technician) {
    return <div>Technician not found</div>
  }
  
  // Get current ship data
  const currentShip = ships.find(ship => ship.id === technician.currentShip)
  const currentShipAnalysis = waterAnalysisData[technician.currentShip as keyof typeof waterAnalysisData]
  
  // Get historical ships
  const historicalAssignments = technician.assignmentHistory.filter(assignment => 
    assignment.endDate !== null // Only show completed assignments
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Ships</h1>
        <p className="text-muted-foreground mt-2">
          Current assignment and assignment history
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Assignment */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Current Assignment</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Active
            </Badge>
          </div>

          {currentShip && currentShipAnalysis ? (
            <CurrentAssignmentCard 
              currentShip={currentShip}
              currentShipAnalysis={currentShipAnalysis}
              technician={technician}
            />
          ) : (
            <NoCurrentAssignmentCard />
          )}
        </div>

        <Separator />

        {/* Assignment History */}
        <AssignmentHistorySection 
          historicalAssignments={historicalAssignments}
          ships={ships}
        />
      </div>
    </div>
  )
}
