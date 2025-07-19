import { Button } from "@/components/ui/button"
import { ArrowLeft, Ship, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface ShipNotFoundCardProps {}

export function ShipNotFoundCard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/technician/ships">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Ships
          </Button>
        </Link>
      </div>
      <div className="text-center py-12">
        <Ship className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ship Not Found</h3>
        <p className="text-gray-500">The requested ship could not be found.</p>
      </div>
    </div>
  )
}

export function AccessDeniedCard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/technician/ships">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Ships
          </Button>
        </Link>
      </div>
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 mx-auto text-red-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-500">You don't have access to this ship's data.</p>
      </div>
    </div>
  )
}
