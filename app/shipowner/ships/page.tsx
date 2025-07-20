"use client"

import { ShipCard } from "@/components/ship-card"
import { ships as initialShips } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AddShipModal } from "@/components/ships/add-ship-modal"
import { 
  Search, 
  Filter,
  Ship,
} from "lucide-react"
import { useState, useEffect } from "react"

interface Ship {
  id: string
  name: string
  type: string
  imo: string
  flag: string
  status: string
  location: string
  capacity: string
  captain: string
  yearBuilt: number
  lastInspection: string
  nextMaintenance: string
  image: string
  fleetId: string
  technicianId: string
}

interface NewShipForm {
  name: string
  type: string
  imo: string
  flag: string
  status: string
  location: string
  capacity: string
  captain: string
  yearBuilt: string
}

export default function ShipsPage() {
  const [ships, setShips] = useState<Ship[]>(initialShips)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [newlyAddedShipId, setNewlyAddedShipId] = useState<string | null>(null)

  const filteredShips = ships.filter(ship => {
    const matchesSearch = ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ship.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ship.captain.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || ship.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || ship.type.toLowerCase() === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const uniqueTypes = [...new Set(ships.map(ship => ship.type))]
  const uniqueStatuses = [...new Set(ships.map(ship => ship.status))]

  // Generate a unique ID for new ships
  const generateShipId = () => {
    const maxId = Math.max(...ships.map(ship => parseInt(ship.id))) || 0
    return (maxId + 1).toString()
  }

  const handleShipAdd = (shipData: NewShipForm) => {
    // Create new ship object with all required fields
    const newShip: Ship = {
      id: generateShipId(),
      name: shipData.name,
      type: shipData.type,
      imo: shipData.imo,
      flag: shipData.flag || "Panama",
      status: shipData.status || "Active",
      location: shipData.location || "Port",
      capacity: shipData.capacity || "N/A",
      captain: shipData.captain,
      yearBuilt: parseInt(shipData.yearBuilt) || new Date().getFullYear(),
      lastInspection: new Date().toISOString().split('T')[0], // Today's date
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
      image: "/cargo-ship.jpg", // Default image
      fleetId: "1", // Default fleet
      technicianId: "tech-001" // Default technician
    }

    // Add the new ship to the beginning of the list
    setShips(prev => [newShip, ...prev])
    
    // Set this ship as newly added for highlighting
    setNewlyAddedShipId(newShip.id)
    
    // Remove the highlight after 3 seconds
    setTimeout(() => {
      setNewlyAddedShipId(null)
    }, 3000)

    console.log("New ship added:", newShip)
  }

  // Clear highlight when filters change
  useEffect(() => {
    setNewlyAddedShipId(null)
  }, [searchTerm, statusFilter, typeFilter])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Ship className="h-8 w-8 text-blue-600" />
            Fleet Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your fleet of {ships.length} vessels
          </p>
        </div>
        
        <AddShipModal onShipAdd={handleShipAdd} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ships by name, type, or captain..."
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

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Ship Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{ships.length}</div>
            <div className="text-sm text-muted-foreground">Total Ships</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {ships.filter(s => s.status === "Active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {ships.filter(s => s.status === "In Transit").length}
            </div>
            <div className="text-sm text-muted-foreground">In Transit</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {ships.filter(s => s.status === "Maintenance").length}
            </div>
            <div className="text-sm text-muted-foreground">Maintenance</div>
          </CardContent>
        </Card>
      </div>

      {/* Ships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShips.map((ship) => (
          <div
            key={ship.id}
            className={`transition-all duration-1000 ${
              newlyAddedShipId === ship.id 
                ? "ring-2 ring-green-500 ring-opacity-50 bg-green-500/10 dark:bg-green-400/10 rounded-lg p-1 shadow-lg scale-105" 
                : ""
            }`}
          >
            <ShipCard ship={ship} />
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredShips.length === 0 && (
        <div className="text-center py-12">
          <Ship className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No ships found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  )
} 