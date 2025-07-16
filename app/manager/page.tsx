import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Ship, Users, Building2, TrendingUp, UserPlus } from "lucide-react"
import { fleets, shipOwners, shipsUpdated } from "@/lib/mock-data"
import { FleetCard } from "@/components/fleet-card"

export default function ManagerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fleet Management</h1>
        <p className="text-muted-foreground">
          Manage your company's fleets, ships, and shipowner assignments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fleets</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleets.length}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ships</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipsUpdated.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all fleets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ship Owners</CardTitle>
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
            <CardTitle className="text-sm font-medium">Fleet Efficiency</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Fleet Activity</CardTitle>
            <CardDescription>
              Latest updates from fleet and shipowner management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                <UserPlus className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{shipOwners[0].name} assigned to {fleets[0].name}</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                <Ship className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">New ship added to {fleets[1].name}</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
                <Building2 className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{fleets[2].name} created</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Fleet performance improved by 15%</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Fleet management operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left p-3 rounded-md border border-border hover:bg-accent transition-colors">
              <div className="font-medium">Create New Fleet</div>
              <div className="text-xs text-muted-foreground">Set up a new fleet for the company</div>
            </button>
            
            <button className="w-full text-left p-3 rounded-md border border-border hover:bg-accent transition-colors">
              <div className="font-medium">Assign Ship Owner</div>
              <div className="text-xs text-muted-foreground">Connect ship owners to fleets</div>
            </button>
            
            <button className="w-full text-left p-3 rounded-md border border-border hover:bg-accent transition-colors">
              <div className="font-medium">Fleet Performance Report</div>
              <div className="text-xs text-muted-foreground">Generate comprehensive fleet analytics</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}