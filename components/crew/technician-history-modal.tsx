"use client"

import { useState } from "react"
import { Technician, WaterAnalysisData, ChemicalAdditionData } from "./types"
import { User, Beaker, Droplets, History, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

interface TechnicianHistoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  technician: Technician | null
  getShipName: (shipId: string) => string
  getWaterAnalysisForTechnician: (technician: Technician) => WaterAnalysisData[]
  getChemicalAdditionsForTechnician: (technician: Technician) => ChemicalAdditionData[]
}

export function TechnicianHistoryModal({
  open,
  onOpenChange,
  technician,
  getShipName,
  getWaterAnalysisForTechnician,
  getChemicalAdditionsForTechnician,
}: TechnicianHistoryModalProps) {
  const [activeTab, setActiveTab] = useState("water-analysis")

  if (!technician) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {technician.name} - Work History
          </DialogTitle>
          <DialogDescription>
            View the technician's activity history including water analyses and chemical additions
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="water-analysis" className="flex items-center gap-2">
              <Beaker className="h-4 w-4" />
              Water Analysis
            </TabsTrigger>
            <TabsTrigger value="chemical-additions" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Chemical Additions
            </TabsTrigger>
            <TabsTrigger value="assignment-history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Assignment History
            </TabsTrigger>
          </TabsList>

          {/* Water Analysis Tab */}
          <TabsContent value="water-analysis">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Water Analysis History</CardTitle>
                <CardDescription>
                  Recent water analyses performed by {technician.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Ship</TableHead>
                        <TableHead>Nitrite (ppm)</TableHead>
                        <TableHead>Chloride (ppm)</TableHead>
                        <TableHead>pH</TableHead>
                        <TableHead>Total Hardness</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getWaterAnalysisForTechnician(technician).map((analysis) => (
                        <TableRow key={`${analysis.shipId}-${analysis.date}`}>
                          <TableCell>{new Date(analysis.date).toLocaleDateString()}</TableCell>
                          <TableCell>{analysis.shipName}</TableCell>
                          <TableCell>{analysis.nitrite}</TableCell>
                          <TableCell>{analysis.chloride}</TableCell>
                          <TableCell>{analysis.pH}</TableCell>
                          <TableCell>{analysis.totalHardness}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                analysis.status === "Good" ? "default" : 
                                analysis.status === "Attention" ? "secondary" : 
                                "destructive"
                              }
                            >
                              {analysis.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chemical Additions Tab */}
          <TabsContent value="chemical-additions">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chemical Additions</CardTitle>
                <CardDescription>
                  Chemical additions performed by {technician.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Ship</TableHead>
                        <TableHead>Chemical</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Unit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getChemicalAdditionsForTechnician(technician).map((addition, index) => (
                        <TableRow key={`${addition.shipId}-${addition.date}-${index}`}>
                          <TableCell>{new Date(addition.date).toLocaleDateString()}</TableCell>
                          <TableCell>{getShipName(addition.shipId)}</TableCell>
                          <TableCell>{addition.chemical}</TableCell>
                          <TableCell>{addition.amount}</TableCell>
                          <TableCell>{addition.unit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignment History Tab */}
          <TabsContent value="assignment-history">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assignment History</CardTitle>
                <CardDescription>
                  Ships that {technician.name} has been assigned to
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ship</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Duration</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {technician.assignmentHistory.map((assignment) => {
                          const startDate = new Date(assignment.startDate);
                          const endDate = assignment.endDate ? new Date(assignment.endDate) : new Date();
                          const durationDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                          
                          return (
                            <TableRow key={`${assignment.shipId}-${assignment.startDate}`}>
                              <TableCell>{assignment.shipName}</TableCell>
                              <TableCell>{startDate.toLocaleDateString()}</TableCell>
                              <TableCell>
                                {assignment.endDate ? endDate.toLocaleDateString() : "Current"}
                              </TableCell>
                              <TableCell>
                                {durationDays} days
                                {!assignment.endDate && " (ongoing)"}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Current Assignment Details */}
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Current Assignment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Ship</p>
                          <p className="font-medium">{getShipName(technician.currentShip)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Department</p>
                          <p className="font-medium">{technician.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">{technician.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Experience</p>
                          <p className="font-medium">{technician.experience}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
