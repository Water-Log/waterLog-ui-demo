"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Building2, 
  Ship, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  ArrowLeft,
  MapPin,
  Anchor,
  Users,
  Calendar,
  Beaker,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"
import Link from "next/link"
import { fleets, ships, shipOwners, waterAnalysisData, getFleetWaterAnalysisSummary } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface FleetDetailPageProps {
  params: {
    id: string
  }
}

export default function FleetDetailPage({ params }: FleetDetailPageProps) {
  const fleet = fleets.find(f => f.id === params.id)
  
  if (!fleet) {
    notFound()
  }

  const fleetShips = ships.filter(ship => ship.fleetId === fleet.id)
  const fleetOwners = shipOwners.filter(owner => 
    owner.assignedFleets.includes(fleet.id)
  )
  const waterAnalysis = getFleetWaterAnalysisSummary(fleet.id)

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Good":
        return "default"
      case "Attention":
        return "secondary"
      case "Critical":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Good":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Attention":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getAnalysisStatus = (value: number, parameter: string) => {
    switch (parameter) {
      case "nitrite":
        if (value >= 1000 && value <= 2400) return { status: "optimal", icon: <CheckCircle className="h-3 w-3 text-green-600" /> }
        else if (value < 1000) return { status: "low", icon: <TrendingDown className="h-3 w-3 text-red-600" /> }
        else return { status: "high", icon: <TrendingUp className="h-3 w-3 text-yellow-600" /> }
      case "chloride":
        if (value <= 50) return { status: "normal", icon: <CheckCircle className="h-3 w-3 text-green-600" /> }
        else if (value <= 80) return { status: "elevated", icon: <TrendingUp className="h-3 w-3 text-yellow-600" /> }
        else return { status: "critical", icon: <AlertTriangle className="h-3 w-3 text-red-600" /> }
      case "pH":
        if (value >= 8.3 && value <= 10) return { status: "good", icon: <CheckCircle className="h-3 w-3 text-green-600" /> }
        else return { status: "out of range", icon: <AlertTriangle className="h-3 w-3 text-red-600" /> }
      case "totalHardness":
        if (value <= 180) return { status: "acceptable", icon: <CheckCircle className="h-3 w-3 text-green-600" /> }
        else return { status: "high", icon: <TrendingUp className="h-3 w-3 text-red-600" /> }
      default:
        return { status: "unknown", icon: <Minus className="h-3 w-3 text-gray-600" /> }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/manager/fleets">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Fleets
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          <h1 className="text-3xl font-bold tracking-tight">{fleet.name}</h1>
          <Badge variant={getStatusBadgeVariant(waterAnalysis.overallStatus)}>
            {waterAnalysis.overallStatus}
          </Badge>
        </div>
      </div>

      {/* Fleet Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fleet Information</CardTitle>
            <CardDescription>Basic details about this fleet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Description:</span>
                <span className="text-sm font-medium">{fleet.description}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Region:</span>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{fleet.region}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Headquarters:</span>
                <span className="text-sm font-medium">{fleet.headquarters}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant={fleet.status === 'Active' ? 'default' : 'secondary'}>
                  {fleet.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="text-sm font-medium">
                  {new Date(fleet.createdDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Voyages:</span>
                <span className="text-sm font-medium">{fleet.activeVoyages}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fleet Statistics</CardTitle>
            <CardDescription>Current fleet performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Ship className="h-8 w-8 text-blue-600 bg-blue-100 rounded-lg p-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Ships</p>
                  <p className="text-xl font-bold">{waterAnalysis.totalShips}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600 bg-green-100 rounded-lg p-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Good Condition</p>
                  <p className="text-xl font-bold text-green-600">{waterAnalysis.goodCondition}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-yellow-600 bg-yellow-100 rounded-lg p-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Need Attention</p>
                  <p className="text-xl font-bold text-yellow-600">{waterAnalysis.needsAttention}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-red-600 bg-red-100 rounded-lg p-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Critical Issues</p>
                  <p className="text-xl font-bold text-red-600">{waterAnalysis.critical}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Water Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5" />
            Fleet Water Analysis Summary
          </CardTitle>
          <CardDescription>
            Average water analysis parameters across all ships in this fleet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg border border-border bg-background">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Nitrite</span>
                {waterAnalysis.averageAnalyses.nitrite ? 
                  getAnalysisStatus(waterAnalysis.averageAnalyses.nitrite, "nitrite").icon : 
                  <Minus className="h-3 w-3 text-gray-600" />
                }
              </div>
              <p className="text-2xl font-bold">{waterAnalysis.averageAnalyses.nitrite || 0} ppm</p>
              <p className="text-xs text-muted-foreground">Target: 1000-2400 ppm</p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-background">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Chloride</span>
                {waterAnalysis.averageAnalyses.chloride ? 
                  getAnalysisStatus(waterAnalysis.averageAnalyses.chloride, "chloride").icon : 
                  <Minus className="h-3 w-3 text-gray-600" />
                }
              </div>
              <p className="text-2xl font-bold">{waterAnalysis.averageAnalyses.chloride || 0} ppm</p>
              <p className="text-xs text-muted-foreground">Max: 50 ppm</p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-background">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">pH Level</span>
                {waterAnalysis.averageAnalyses.pH ? 
                  getAnalysisStatus(waterAnalysis.averageAnalyses.pH, "pH").icon : 
                  <Minus className="h-3 w-3 text-gray-600" />
                }
              </div>
              <p className="text-2xl font-bold">{waterAnalysis.averageAnalyses.pH || 0}</p>
              <p className="text-xs text-muted-foreground">Target: 8.3-10</p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-background">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Total Hardness</span>
                {waterAnalysis.averageAnalyses.totalHardness ? 
                  getAnalysisStatus(waterAnalysis.averageAnalyses.totalHardness, "totalHardness").icon : 
                  <Minus className="h-3 w-3 text-gray-600" />
                }
              </div>
              <p className="text-2xl font-bold">{waterAnalysis.averageAnalyses.totalHardness || 0} ppm</p>
              <p className="text-xs text-muted-foreground">Max: 180 ppm CaCO3</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Ship Owners */}
      {fleetOwners.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Assigned Ship Owners
            </CardTitle>
            <CardDescription>
              Ship owners responsible for this fleet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {fleetOwners.map((owner) => (
                <div key={owner.id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{owner.name}</h4>
                      <p className="text-sm text-muted-foreground">{owner.specialization}</p>
                    </div>
                    <Badge variant="outline">{owner.status}</Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>Experience: {owner.experience}</p>
                    <p>License: {owner.licenseNumber}</p>
                    <p>Joined: {new Date(owner.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fleet Ships */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Anchor className="h-5 w-5" />
            Fleet Ships ({fleetShips.length})
          </CardTitle>
          <CardDescription>
            All ships assigned to this fleet with their water analysis status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {fleetShips.map((ship) => {
              const shipWaterData = waterAnalysisData[ship.id as keyof typeof waterAnalysisData]
              return (
                <div key={ship.id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-lg">{ship.name}</h4>
                      <p className="text-sm text-muted-foreground">{ship.type} • IMO: {ship.imo}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>Flag: {ship.flag}</span>
                        <span>Captain: {ship.captain}</span>
                        <span>Built: {ship.yearBuilt}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={ship.status === 'Active' ? 'default' : ship.status === 'Maintenance' ? 'secondary' : 'outline'}>
                        {ship.status}
                      </Badge>
                      {shipWaterData && (
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusIcon(shipWaterData.currentStatus)}
                          <Badge variant={getStatusBadgeVariant(shipWaterData.currentStatus)} className="text-xs">
                            {shipWaterData.currentStatus}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p className="font-medium">{ship.location}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capacity:</span>
                      <p className="font-medium">{ship.capacity}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Inspection:</span>
                      <p className="font-medium">{new Date(ship.lastInspection).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Next Maintenance:</span>
                      <p className="font-medium">{new Date(ship.nextMaintenance).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {shipWaterData && shipWaterData.alerts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm font-medium text-red-600 mb-2">Active Alerts:</p>
                      <div className="space-y-1">
                        {shipWaterData.alerts.map((alert: string, index: number) => (
                          <p key={index} className="text-xs text-red-600 flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3" />
                            {alert}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
