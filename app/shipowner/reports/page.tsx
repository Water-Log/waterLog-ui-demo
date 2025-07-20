"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Ship as ShipIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { 
  ships, 
  waterAnalysisData, 
  fleets,
  shipOwners
} from "@/lib/mock-data"
import { MonthlyReportCard } from "@/components/reports/monthly-report-card"
import { 
  ShipownerReportFilters, 
  ShipInfoCard, 
  AlertsCard, 
  CombinedFleetCard
} from "@/components/reports"
import { Ship, Fleet, ShipOwner, WaterAnalysisData } from "@/components/reports/types"

export default function ShipownerReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("07")
  const [selectedYear, setSelectedYear] = useState<string>("2024")
  const [selectedShip, setSelectedShip] = useState<string>("")
  
  // Mock shipowner data - in real app this would come from authentication
  const shipOwnerId = "owner-1"
  const shipOwner = shipOwners.find(o => o.id === shipOwnerId)
  
  if (!shipOwner) {
    return <div>Shipowner not found</div>
  }
  
  // Get fleets assigned to this shipowner
  const ownerFleets = fleets.filter(fleet => 
    fleet.shipOwners.includes(shipOwnerId)
  )
  
  // Get all ships in the shipowner's fleets
  const fleetIds = ownerFleets.map(fleet => fleet.id)
  const ownerShips = ships.filter(ship => 
    ship.fleetId && fleetIds.includes(ship.fleetId)
  )

  // Set the first ship as selected by default
  useEffect(() => {
    if (ownerShips.length > 0 && !selectedShip) {
      setSelectedShip(ownerShips[0].id)
    }
  }, [ownerShips, selectedShip])
  
  // Get the selected ship and its analysis data
  const currentShip = ownerShips.find(s => s.id === selectedShip)
  const shipAnalysis = selectedShip 
    ? waterAnalysisData[selectedShip as keyof typeof waterAnalysisData] 
    : undefined
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Fleet Reports</h1>
        <p className="text-muted-foreground mt-2">
          Water analysis data and reports for all ships in your assigned fleets
        </p>
      </div>

      {/* Fleet Summary & Analysis */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Fleet Overview</h2>
          <Badge variant="secondary">
            {ownerFleets.length} fleets assigned
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ownerFleets.map(fleet => {
            // Get ships in this fleet
            const fleetShipIds = fleet.shipIds
            const fleetShipsData = fleetShipIds
              .map(id => waterAnalysisData[id as keyof typeof waterAnalysisData])
              .filter(Boolean)
            
            return (
              <CombinedFleetCard
                key={fleet.id}
                fleet={fleet}
                fleetShipsData={fleetShipsData}
              />
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Reports Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Ship Reports</h2>
          <Badge variant="secondary">
            {ownerShips.length} ships available
          </Badge>
        </div>

        {ownerShips.length > 0 ? (
          <div className="space-y-6">
            {/* Report Filters */}
            <ShipownerReportFilters 
              selectedShip={selectedShip}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              ships={ownerShips}
              onShipChange={setSelectedShip}
              onMonthChange={setSelectedMonth}
              onYearChange={setSelectedYear}
            />

            {/* Selected Ship Information */}
            {currentShip && (
              <ShipInfoCard ship={currentShip} shipAnalysis={shipAnalysis} />
            )}

            {/* Ship Monthly Report */}
            {currentShip && (
              <MonthlyReportCard 
                selectedShip={currentShip.id}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                shipName={currentShip.name}
              />
            )}

            {/* Current Alerts */}
            {shipAnalysis?.alerts && (
              <AlertsCard alerts={shipAnalysis.alerts} />
            )}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <ShipIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Ships Found</h3>
                <p className="text-gray-500">
                  You don't have any ships assigned to your fleets.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>


    </div>
  )
}
