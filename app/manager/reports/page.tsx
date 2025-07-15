import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Calendar } from "lucide-react"

export default function ManagerReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fleet Reports</h1>
        <p className="text-muted-foreground">
          Generate and manage fleet performance reports
        </p>
      </div>

      {/* Reports coming soon */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Reporting System</CardTitle>
          <CardDescription>
            Generate comprehensive fleet reports and documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Reporting System</h3>
            <p className="text-muted-foreground">
              Advanced fleet reporting and documentation features are coming soon.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
