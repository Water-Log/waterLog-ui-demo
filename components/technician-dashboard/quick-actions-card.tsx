import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Beaker, FileText, Droplets } from "lucide-react"
import Link from "next/link"

export function QuickActionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks for water analysis management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/technician/water-analysis">
            <Button className="h-16 flex-col w-full">
              <Beaker className="h-5 w-5 mb-1" />
              <span className="text-xs">Add Analysis</span>
            </Button>
          </Link>
          <Link href="/technician/chemicals">
            <Button variant="outline" className="h-16 flex-col w-full">
              <Droplets className="h-5 w-5 mb-1" />
              <span className="text-xs">Add Chemicals</span>
            </Button>
          </Link>
          <Link href="/technician/reports">
            <Button variant="outline" className="h-16 flex-col w-full">
              <FileText className="h-5 w-5 mb-1" />
              <span className="text-xs">View Reports</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
