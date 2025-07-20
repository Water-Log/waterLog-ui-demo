"use client"

import { Technician } from "./types"
import { User, Ship, MapPin, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TechnicianTableProps {
  technicians: Technician[]
  getShipName: (shipId: string) => string
  onViewHistory: (technician: Technician) => void
}

export function TechnicianTable({
  technicians,
  getShipName,
  onViewHistory
}: TechnicianTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Technicians</CardTitle>
        <CardDescription>
          {technicians.length} technicians found
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Current Ship</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden md:table-cell">Experience</TableHead>
                <TableHead className="hidden lg:table-cell">Location</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technicians.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No technicians found
                  </TableCell>
                </TableRow>
              ) : (
                technicians.map((technician) => (
                  <TableRow key={technician.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{technician.name}</div>
                          <div className="text-sm text-muted-foreground">{technician.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Ship className="h-4 w-4 text-muted-foreground" />
                        <div>{getShipName(technician.currentShip)}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {technician.department}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {technician.experience}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{technician.location}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant={technician.status === "Active" ? "default" : "secondary"}>
                        {technician.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onViewHistory(technician)}
                        >
                          <ClipboardCheck className="h-4 w-4 mr-2" />
                          View History
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
