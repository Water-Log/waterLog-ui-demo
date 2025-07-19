import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { WaterAnalysisForm } from "./types"

interface WaterAnalysisFormCardProps {
  form: WaterAnalysisForm
  setForm: (form: WaterAnalysisForm) => void
  onAnalyze: () => void
  isAnalyzing: boolean
  canAnalyze: boolean
}

export function WaterAnalysisFormCard({
  form,
  setForm,
  onAnalyze,
  isAnalyzing,
  canAnalyze
}: WaterAnalysisFormCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Water Analysis Entry</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the water analysis parameters for AI evaluation
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div className="space-y-2">
          <Label>Analysis Date</Label>
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
                onSelect={(date) => setForm({ ...form, date: date || new Date() })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Parameter Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nitrite">Nitrite (ppm)</Label>
            <Input
              id="nitrite"
              type="number"
              placeholder="1000-2400"
              value={form.nitrite}
              onChange={(e) => setForm({ ...form, nitrite: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chloride">Chloride (ppm)</Label>
            <Input
              id="chloride"
              type="number"
              placeholder="Max: 50"
              value={form.chloride}
              onChange={(e) => setForm({ ...form, chloride: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pH">pH Level</Label>
            <Input
              id="pH"
              type="number"
              step="0.1"
              placeholder="8.3-10"
              value={form.pH}
              onChange={(e) => setForm({ ...form, pH: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalHardness">Total Hardness (ppm CaCO3)</Label>
            <Input
              id="totalHardness"
              type="number"
              placeholder="Max: 180"
              value={form.totalHardness}
              onChange={(e) => setForm({ ...form, totalHardness: e.target.value })}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any observations, unusual conditions, or comments..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        {/* Analyze Button */}
        <Button 
          onClick={onAnalyze}
          disabled={!canAnalyze || isAnalyzing}
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Analyze Water Sample
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
