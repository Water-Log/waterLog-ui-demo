import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Ship, Calendar, Mail, Phone, MapPin } from "lucide-react"
import { shipOwners, fleets } from "@/lib/mock-data"

export default function ShipOwnersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ship Owners Management</h1>
        <p className="text-muted-foreground">
          Manage ship owners and their fleet assignments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ship Owners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipOwners.length}</div>
            <p className="text-xs text-muted-foreground">
              Active assignments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Fleets</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleets.length}</div>
            <p className="text-xs text-muted-foreground">
              All fleets covered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Experience</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.5 years</div>
            <p className="text-xs text-muted-foreground">
              Experienced team
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ship Owners List */}
      <Card>
        <CardHeader>
          <CardTitle>Ship Owners Directory</CardTitle>
          <CardDescription>
            Complete list of ship owners and their fleet assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {shipOwners.map((owner) => {
              const assignedFleetNames = fleets
                .filter(fleet => owner.assignedFleets.includes(fleet.id))
                .map(fleet => fleet.name)

              return (
                <div key={owner.id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{owner.name}</h3>
                      <p className="text-sm text-muted-foreground">{owner.specialization}</p>
                    </div>
                    <Badge variant="outline">{owner.status}</Badge>
                  </div>
                  
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{owner.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{owner.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{owner.nationality}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm text-muted-foreground">Assigned Fleets:</span>
                      {assignedFleetNames.map((fleetName) => (
                        <Badge key={fleetName} variant="secondary" className="text-xs">
                          {fleetName}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                      <span>Experience: {owner.experience}</span>
                      <span>License: {owner.licenseNumber}</span>
                      <span>Joined: {new Date(owner.joinDate).toLocaleDateString()}</span>
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
