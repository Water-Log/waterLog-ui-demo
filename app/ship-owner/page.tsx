import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ship, Calendar, Anchor, MapPin, Activity } from "lucide-react"
import { shipOwners, fleets, ships, getShipsByFleet } from "@/lib/mock-data"

export default function ShipOwnerPage() {
  // In a real app, this would use the authenticated user's ID
  // For now, we'll use the first ship owner in our mock data
  const currentShipOwner = shipOwners[0]
  
  // Get the fleets assigned to the current ship owner
  const assignedFleets = fleets.filter(fleet => 
    currentShipOwner.assignedFleets.includes(fleet.id)
  )
  
  // Get all ships in those fleets
  const assignedShips = assignedFleets.flatMap(fleet => 
    getShipsByFleet(fleet.id)
  )
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Fleets</CardTitle>
            <Anchor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedFleets.length}</div>
            <p className="text-xs text-muted-foreground">
              Active fleet assignments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ships</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedShips.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all fleets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Voyages</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignedFleets.reduce((sum, fleet) => sum + fleet.activeVoyages, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Current ongoing journeys
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fleets List */}
      <Card>
        <CardHeader>
          <CardTitle>My Assigned Fleets</CardTitle>
          <CardDescription>
            Fleets that you are currently managing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {assignedFleets.map((fleet) => {
              return (
                <div key={fleet.id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{fleet.name}</h3>
                      <p className="text-sm text-muted-foreground">{fleet.company}</p>
                    </div>
                    <Badge variant={fleet.status === "Active" ? "default" : "outline"}>
                      {fleet.status}
                    </Badge>
                  </div>
                  
                  <div className="grid gap-3 md:grid-cols-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{fleet.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4 text-muted-foreground" />
                      <span>{fleet.totalShips} ships</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Active Voyages: {fleet.activeVoyages}</span>
                      <span>Created: {new Date(fleet.createdDate).toLocaleDateString()}</span>
                      <span>HQ: {fleet.headquarters}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Ships List */}
      <Card>
        <CardHeader>
          <CardTitle>My Ships</CardTitle>
          <CardDescription>
            All ships in your assigned fleets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {assignedShips.map((ship) => {
              return (
                <div key={ship.id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{ship.name}</h3>
                      <p className="text-sm text-muted-foreground">{ship.type}</p>
                    </div>
                    <Badge variant={ship.status === "Active" ? "default" : "outline"}>
                      {ship.status}
                    </Badge>
                  </div>
                  
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{ship.location}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>IMO: {ship.imo}</span>
                      <span>Flag: {ship.flag}</span>
                      <span>Built: {ship.yearBuilt}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
