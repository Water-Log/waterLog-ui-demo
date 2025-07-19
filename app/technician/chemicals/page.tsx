"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, Save, RefreshCw, Beaker, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { technicians, ships, waterAnalysisData } from "@/lib/mock-data"

// Mock current technician
const currentTechnician = technicians[0] // John Smith

interface ChemicalAdditionForm {
  date: Date
  chemical: string
  amount: string
  unit: string
  reason: string
  notes: string
}

export default function ChemicalAdditionsPage() {
  const [form, setForm] = useState<ChemicalAdditionForm>({
    date: new Date(),
    chemical: "Rocor NB Liquid",
    amount: "",
    unit: "Lt",
    reason: "",
    notes: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get current ship information
  const currentShip = ships.find(ship => ship.id === currentTechnician.currentShip)
  const currentShipAnalysis = waterAnalysisData[currentTechnician.currentShip as keyof typeof waterAnalysisData]

  const handleSubmit = () => {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log("Chemical addition recorded:", form)
      setIsSubmitting(false)
      
      // Reset form
      setForm({
        date: new Date(),
        chemical: "Rocor NB Liquid",
        amount: "",
        unit: "Lt",
        reason: "",
        notes: ""
      })
      
      // Show success message (in real app)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800"
      case "Attention": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const canSubmit = form.chemical && form.amount && form.reason

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chemical Additions</h1>
        <p className="text-muted-foreground">
          Record chemical treatments and additives for water system maintenance
        </p>
      </div>

      {/* Current Ship Status */}
      {currentShip && currentShipAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Current Assignment
              <Badge className={getStatusColor(currentShipAnalysis.currentStatus)}>
                {currentShipAnalysis.currentStatus}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium">{currentShip.name}</p>
                <p className="text-muted-foreground">{currentShip.type}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">{currentShip.location}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Analysis</p>
                <p className="font-medium">{currentShipAnalysis.lastAnalysisDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Chemical Addition</p>
                <p className="font-medium">{currentShipAnalysis.lastChemicalAddition}</p>
              </div>
            </div>
            
            {/* Active Alerts */}
            {currentShipAnalysis.alerts && currentShipAnalysis.alerts.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-red-800 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  Active Alerts Requiring Treatment
                </div>
                <div className="space-y-1">
                  {currentShipAnalysis.alerts.slice(0, 2).map((alert, index) => (
                    <div key={index} className="text-xs text-red-700">• {alert}</div>
                  ))}
                  {currentShipAnalysis.alerts.length > 2 && (
                    <div className="text-xs text-red-700">• ... and {currentShipAnalysis.alerts.length - 2} more</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Chemical Addition Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5" />
            Record Chemical Addition
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Add chemicals to the water treatment system and record the treatment details
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Treatment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.date ? format(form.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={form.date}
                      onSelect={(date) => setForm(prev => ({ ...prev, date: date || new Date() }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Chemical Selection */}
              <div className="space-y-2">
                <Label htmlFor="chemical">Chemical Type</Label>
                <Select value={form.chemical} onValueChange={(value) => setForm(prev => ({ ...prev, chemical: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select chemical" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rocor NB Liquid">Rocor NB Liquid (Nitrite-based inhibitor)</SelectItem>
                    <SelectItem value="Sodium Nitrite">Sodium Nitrite (Corrosion inhibitor)</SelectItem>
                    <SelectItem value="Alkalinity Booster">Alkalinity Booster (pH adjustment)</SelectItem>
                    <SelectItem value="Scale Inhibitor">Scale Inhibitor (Anti-scaling)</SelectItem>
                    <SelectItem value="Water Softener">Water Softener (Hardness reduction)</SelectItem>
                    <SelectItem value="pH Buffer">pH Buffer (pH stabilization)</SelectItem>
                    <SelectItem value="Biocide">Biocide (Microbial control)</SelectItem>
                    <SelectItem value="Other">Other (Specify in notes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount and Unit */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={form.amount}
                    onChange={(e) => setForm(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={form.unit} onValueChange={(value) => setForm(prev => ({ ...prev, unit: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lt">Liters (Lt)</SelectItem>
                      <SelectItem value="ml">Milliliters (ml)</SelectItem>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="ppm">Parts per million (ppm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Treatment Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason">Treatment Reason *</Label>
                <Select value={form.reason} onValueChange={(value) => setForm(prev => ({ ...prev, reason: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select treatment reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine Maintenance</SelectItem>
                    <SelectItem value="low-nitrite">Low Nitrite Correction</SelectItem>
                    <SelectItem value="high-chloride">High Chloride Treatment</SelectItem>
                    <SelectItem value="ph-adjustment">pH Level Adjustment</SelectItem>
                    <SelectItem value="scale-prevention">Scale Formation Prevention</SelectItem>
                    <SelectItem value="corrosion-protection">Corrosion Protection</SelectItem>
                    <SelectItem value="emergency">Emergency Treatment</SelectItem>
                    <SelectItem value="preventive">Preventive Treatment</SelectItem>
                    <SelectItem value="water-quality">Water Quality Improvement</SelectItem>
                    <SelectItem value="other">Other (Specify in notes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Treatment Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Treatment Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional observations, conditions, or special instructions..."
                  rows={4}
                  value={form.notes}
                  onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t">
            <Button 
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="w-full md:w-auto"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Recording Treatment...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Record Chemical Addition
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
