"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ships, waterAnalysisData, historicalWaterAnalysisData, technicians, chemicalAdditions } from "@/lib/mock-data"
import {
  ShipInformationCard,
  CurrentWaterQualityStatusCard,
  HistoricalAnalysisTableCard,
  ShipNotFoundCard,
  AccessDeniedCard
} from "@/components/ships"

interface ShipDetailPageProps {
  params: {
    id: string
  }
}

export default function ShipDetailPage({ params }: ShipDetailPageProps) {
  const shipId = params.id
  const ship = ships.find(s => s.id === shipId)
  const currentAnalysis = waterAnalysisData[shipId as keyof typeof waterAnalysisData]
  const historicalData = historicalWaterAnalysisData[shipId as keyof typeof historicalWaterAnalysisData]

  // Get technician info to verify access
  const technicianId = "tech-001"
  const technician = technicians.find(t => t.id === technicianId)
  
  if (!technician) {
    return <div>Technician not found</div>
  }

  if (!ship) {
    return <ShipNotFoundCard />
  }

  // Check if technician has access to this ship (current or historical)
  const hasAccess = technician.currentShip === shipId || 
    technician.assignmentHistory.some(assignment => assignment.shipId === shipId)

  if (!hasAccess) {
    return <AccessDeniedCard />
  }

  const isCurrentShip = technician.currentShip === shipId
  const assignment = technician.assignmentHistory.find(a => a.shipId === shipId)

  const getChemicalAddition = (date: string) => {
    const additions = chemicalAdditions[shipId as keyof typeof chemicalAdditions]
    if (!additions) return null
    
    return additions.find(addition => addition.date === date) || null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/technician/ships">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Ships
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{ship.name}</h1>
            <p className="text-muted-foreground">Water Analysis History</p>
          </div>
        </div>
        <Badge className={isCurrentShip ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
          {isCurrentShip ? "Current Assignment" : "Historical Assignment"}
        </Badge>
      </div>

      {/* Ship Information */}
      <ShipInformationCard 
        ship={ship}
        currentAnalysis={currentAnalysis}
        assignment={assignment}
        isCurrentShip={isCurrentShip}
      />

      {/* Current Status (if current ship) */}
      {isCurrentShip && currentAnalysis && (
        <CurrentWaterQualityStatusCard currentAnalysis={currentAnalysis} />
      )}

      {/* Historical Analysis Data */}
      <HistoricalAnalysisTableCard 
        historicalData={historicalData}
        getChemicalAddition={getChemicalAddition}
      />
    </div>
  )
}
