"use client"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Ship, 
  MapPin, 
  Calendar, 
  User, 
  Anchor,
  Settings,
  Flag
} from "lucide-react"

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
}

interface ShipCardProps {
  ship: Ship
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "in transit":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getShipTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "container ship":
      return "🚢"
    case "bulk carrier":
      return "🚛"
    case "tanker":
      return "🛢️"
    case "ice breaker":
      return "🧊"
    default:
      return "⚓"
  }
}

export function ShipCard({ ship }: ShipCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                <Ship className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div>{ship.name}</div>
                <CardDescription className="text-sm font-medium text-blue-600 mt-1">
                  {ship.type} • IMO: {ship.imo}
                </CardDescription>
              </div>
            </CardTitle>
          </div>
          <Badge className={getStatusColor(ship.status)}>
            {ship.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{ship.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{ship.captain}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Flag className="h-4 w-4 flex-shrink-0" />
              <span>{ship.flag}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Anchor className="h-4 w-4 flex-shrink-0" />
              <span>{ship.capacity}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>Built {ship.yearBuilt}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Settings className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs">Next: {new Date(ship.nextMaintenance).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 text-center">
            Last inspection: {new Date(ship.lastInspection).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 