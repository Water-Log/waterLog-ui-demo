import { Card, CardContent } from "@/components/ui/card"
import { Ship } from "lucide-react"
import { Technician } from "./types"

interface NoShipAssignmentCardProps {
  technician: Technician
}

export function NoShipAssignmentCard({ technician }: NoShipAssignmentCardProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Technician Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {technician.name}.
        </p>
      </div>
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Ship className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Ship Assigned</h3>
            <p className="text-gray-500">
              You don't have a ship assignment yet. Contact your administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
