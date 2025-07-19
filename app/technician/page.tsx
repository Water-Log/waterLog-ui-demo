"use client"

import { ships, waterAnalysisData, technicians } from "@/lib/mock-data"
import {
  CurrentShipCard,
  RecentActivityCard,
  QuickActionsCard,
  NoShipAssignmentCard
} from "@/components/technician-dashboard"

export default function TechnicianPage() {
  // Mock technician data - in real app this would come from authentication
  const technicianId = "tech-001"
  const technician = technicians.find(t => t.id === technicianId)
  
  if (!technician) {
    return <div>Technician not found</div>
  }
  
  // Get current ship data
  const currentShip = ships.find(ship => ship.id === technician.currentShip)
  const currentShipAnalysis = waterAnalysisData[technician.currentShip as keyof typeof waterAnalysisData]
  
  if (!currentShip || !currentShipAnalysis) {
    return <NoShipAssignmentCard technician={technician} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Technician Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {technician.name}. Current assignment: {currentShip.name}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Current Ship Card */}
        <CurrentShipCard 
          currentShip={currentShip}
          currentShipAnalysis={currentShipAnalysis}
        />

        {/* Quick Actions and Recent Activity Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <RecentActivityCard 
            currentShip={currentShip}
            currentShipAnalysis={currentShipAnalysis}
          />

          {/* Quick Actions */}
          <QuickActionsCard />
        </div>
      </div>
    </div>
  )
}
