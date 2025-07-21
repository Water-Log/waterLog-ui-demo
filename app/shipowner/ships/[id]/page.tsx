"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Ship as ShipIcon, Users, AlertTriangle, Clipboard, UserPlus } from "lucide-react"
import Link from "next/link"
import { ships, waterAnalysisData, historicalWaterAnalysisData, technicians, chemicalAdditions } from "@/lib/mock-data"
import {
  ShipInformationCard,
  CurrentWaterQualityStatusCard,
  HistoricalAnalysisTableCard,
  AssignTechnicianModal
} from "@/components/ships"
import Image from "next/image"

interface ShipDetailPageProps {
  params: {
    id: string
  }
}

export default function ShipOwnerShipDetailPage({ params }: ShipDetailPageProps) {
  const shipId = params.id
  const ship = ships.find(s => s.id === shipId)
  const currentAnalysis = waterAnalysisData[shipId as keyof typeof waterAnalysisData]
  const historicalData = historicalWaterAnalysisData[shipId as keyof typeof historicalWaterAnalysisData]
  const [activeTab, setActiveTab] = useState("overview")
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  
  // Get assigned technicians
  const assignedTechnicians = technicians.filter(tech => 
    tech.currentShip === shipId || 
    tech.assignmentHistory.some(assignment => assignment.shipId === shipId)
  )

  // Find the current technician
  const currentTechnician = technicians.find(tech => tech.currentShip === shipId)

  // Handle assigning a technician
  const handleAssignTechnician = (technicianIds: string[]) => {
    if (technicianIds.length === 0) return
    
    console.log(`Assigning technician(s) ${technicianIds.join(", ")} to ship ${shipId}`)
    
    // In a real application, this would call an API to update the assignment
    alert(`Technician(s) successfully assigned to ${ship?.name}`)
  }

  if (!ship) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-500">Ship Not Found</CardTitle>
            <CardDescription className="text-center">
              The requested ship could not be found in your fleet.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ShipIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-center mb-4">
              The ship with ID {shipId} does not exist or you don't have permission to access it.
            </p>
            <Link href="/shipowner/ships">
              <Button>Return to Fleet</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getChemicalAddition = (date: string) => {
    const additions = chemicalAdditions[shipId as keyof typeof chemicalAdditions]
    if (!additions) return null
    
    return additions.find(addition => addition.date === date) || null
  }
  
  // Calculate alerts count
  const alertsCount = currentAnalysis?.alerts?.length || 0
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/shipowner/ships">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Fleet
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{ship.name}</h1>
            <p className="text-muted-foreground">{ship.type} • IMO: {ship.imo}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsAssignModalOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            {currentTechnician ? "Reassign Technician" : "Assign Technician"}
          </Button>
          <Badge className={ship.status === "Active" ? "bg-green-100 text-green-800" : 
                ship.status === "Maintenance" ? "bg-yellow-100 text-yellow-800" : 
                "bg-blue-100 text-blue-800"}>
            {ship.status}
          </Badge>
        </div>
      </div>

      {/* Ship Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 flex overflow-hidden">
          <div className="relative w-1/3">
            <Image 
              src={ship.image || "/cargo-ship.jpg"} 
              alt={ship.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-2/3 p-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold">{ship.name}</h2>
              <p className="text-muted-foreground">{ship.type} vessel</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Captain</p>
                <p className="font-medium">{ship.captain}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Flag</p>
                <p className="font-medium">{ship.flag}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{ship.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Year Built</p>
                <p className="font-medium">{ship.yearBuilt}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Inspection</p>
              <p className="font-medium">{ship.lastInspection}</p>
              <p className="text-sm text-muted-foreground mt-2">Next Maintenance</p>
              <p className="font-medium">{ship.nextMaintenance}</p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Assigned Technicians
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignedTechnicians.length > 0 ? (
              assignedTechnicians.map(tech => (
                <div key={tech.id} className="flex items-center gap-3 p-3 rounded-md bg-muted">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{tech.name}</p>
                    <p className="text-xs text-muted-foreground">{tech.currentShip === ship.id ? "Current Assignment" : "Previous Assignment"}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No technicians assigned</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Details */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <ShipIcon className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Clipboard className="h-4 w-4" />
            Water Analysis
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2 relative">
            <AlertTriangle className="h-4 w-4" />
            Alerts
            {alertsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {alertsCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <ShipInformationCard 
            ship={ship}
            currentAnalysis={currentAnalysis}
            assignment={undefined}
            isCurrentShip={true}
          />
          
          {currentAnalysis && (
            <CurrentWaterQualityStatusCard currentAnalysis={currentAnalysis} />
          )}
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          {/* Historical Analysis Data */}
          <HistoricalAnalysisTableCard 
            historicalData={historicalData}
            getChemicalAddition={getChemicalAddition}
          />
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-6">
          {/* Alerts Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Active Alerts
              </CardTitle>
              <CardDescription>
                {alertsCount > 0 ? `${alertsCount} alerts require your attention` : 'No active alerts'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentAnalysis?.alerts && currentAnalysis.alerts.length > 0 ? (
                <div className="space-y-4">
                  {currentAnalysis.alerts.map((alert, index) => (
                    <div key={index} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <div className="font-medium">{alert}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active alerts</h3>
                  <p className="text-muted-foreground">
                    This ship has no water quality alerts at this time.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assign Technician Modal */}
      <AssignTechnicianModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignTechnician}
        shipId={shipId}
        shipName={ship.name}
        currentlyAssignedTechnicianId={currentTechnician?.id}
      />
    </div>
  )
}
