"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Building2, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Search,
  Filter
} from "lucide-react"
import { fleets as initialFleets, getFleetWaterAnalysisSummary } from "@/lib/mock-data"
import { FleetCard } from "@/components/fleet-card"
import { AddFleetModal } from "@/components/fleet/add-fleet-modal"
import { useState, useEffect } from "react"

interface Fleet {
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

interface NewFleetForm {
  name: string
  company: string
  region: string
  status: string
  description: string
  headquarters: string
}

export default function FleetsPage() {
  const [fleets, setFleets] = useState<Fleet[]>(initialFleets)
  const [expandedFleets, setExpandedFleets] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [newlyAddedFleetId, setNewlyAddedFleetId] = useState<string | null>(null)
  
  const fleetsWithAnalysis = fleets.map(fleet => ({
    ...fleet,
    waterAnalysis: getFleetWaterAnalysisSummary(fleet.id)
  }))

  // Filter fleets based on search and filters
  const filteredFleets = fleetsWithAnalysis.filter(fleet => {
    const matchesSearch = fleet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fleet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fleet.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fleet.region.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || fleet.status.toLowerCase() === statusFilter
    const matchesRegion = regionFilter === "all" || fleet.region.toLowerCase() === regionFilter

    return matchesSearch && matchesStatus && matchesRegion
  })

  // Get unique values for filters
  const uniqueStatuses = [...new Set(fleets.map(fleet => fleet.status))]
  const uniqueRegions = [...new Set(fleets.map(fleet => fleet.region))]

  // Generate a unique ID for new fleets
  const generateFleetId = () => {
    const maxId = Math.max(...fleets.map(fleet => parseInt(fleet.id))) || 0
    return (maxId + 1).toString()
  }

  const handleFleetAdd = (fleetData: NewFleetForm) => {
    // Create new fleet object with all required fields
    const newFleet: Fleet = {
      id: generateFleetId(),
      name: fleetData.name,
      company: fleetData.company,
      region: fleetData.region,
      status: fleetData.status || "Active",
      createdDate: new Date().toISOString().split('T')[0], // Today's date
      shipOwners: [], // Start with empty array
      shipIds: [], // Start with empty array
      description: fleetData.description || "",
      headquarters: fleetData.headquarters || "",
      totalShips: 0, // Start with 0 ships
      activeVoyages: 0 // Start with 0 voyages
    }

    // Add the new fleet to the beginning of the list
    setFleets(prev => [newFleet, ...prev])
    
    // Set this fleet as newly added for highlighting
    setNewlyAddedFleetId(newFleet.id)
    
    // Remove the highlight after 3 seconds
    setTimeout(() => {
      setNewlyAddedFleetId(null)
    }, 3000)

    console.log("New fleet added:", newFleet)
  }

  // Clear highlight when filters change
  useEffect(() => {
    setNewlyAddedFleetId(null)
  }, [searchTerm, statusFilter, regionFilter])

  const toggleFleetExpansion = (fleetId: string) => {
    setExpandedFleets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(fleetId)) {
        newSet.delete(fleetId)
      } else {
        newSet.add(fleetId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fleet Water Analysis</h1>
          <p className="text-muted-foreground">
            Monitor cooling water analysis across all fleets for optimal ship performance
          </p>
        </div>
        <AddFleetModal onFleetAdd={handleFleetAdd} />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fleets by name, description, company, or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {uniqueStatuses.map(status => (
                <SelectItem key={status} value={status.toLowerCase()}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {uniqueRegions.map(region => (
                <SelectItem key={region} value={region.toLowerCase()}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Fleet Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fleets</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredFleets.length}</div>
            <p className="text-xs text-muted-foreground">
              Active fleets under monitoring
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ships in Good Condition</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {filteredFleets.reduce((sum, fleet) => sum + fleet.waterAnalysis.goodCondition, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Optimal water parameters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {filteredFleets.reduce((sum, fleet) => sum + fleet.waterAnalysis.needsAttention, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Minor adjustments needed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {filteredFleets.reduce((sum, fleet) => sum + fleet.waterAnalysis.critical, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Immediate action required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Details */}
      <div className="grid gap-6">
        {filteredFleets.length > 0 ? (
          filteredFleets.map((fleet) => (
            <div
              key={fleet.id}
              className={`transition-all duration-1000 ${
                newlyAddedFleetId === fleet.id 
                  ? "ring-2 ring-green-500 ring-opacity-50 bg-green-50 rounded-lg p-1 shadow-lg scale-105" 
                  : ""
              }`}
            >
              <FleetCard
                fleet={fleet}
                waterAnalysis={fleet.waterAnalysis}
                showWaterAnalysis={true}
                isExpanded={expandedFleets.has(fleet.id)}
                onToggleExpansion={() => toggleFleetExpansion(fleet.id)}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No fleets found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or filters to find fleets.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
