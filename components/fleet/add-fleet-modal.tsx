"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

// Fleet regions and statuses for select options
const fleetRegions = [
  "Pacific Ocean",
  "Atlantic Ocean", 
  "Indian Ocean",
  "Mediterranean Sea",
  "Caribbean Sea",
  "North Sea",
  "Baltic Sea",
  "Red Sea",
  "Persian Gulf",
  "South China Sea"
]

const fleetStatuses = ["Active", "Setup", "Maintenance", "Inactive"]

const headquarters = [
  "Singapore",
  "Rotterdam", 
  "Hamburg",
  "Shanghai",
  "Los Angeles",
  "New York",
  "Dubai",
  "Mumbai",
  "Piraeus",
  "Southampton",
  "Antwerp",
  "Valencia",
  "Tokyo",
  "Busan"
]

interface NewFleetForm {
  name: string
  company: string
  region: string
  status: string
  description: string
  headquarters: string
}

interface AddFleetModalProps {
  onFleetAdd?: (fleetData: NewFleetForm) => void
}

export function AddFleetModal({ onFleetAdd }: AddFleetModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newFleet, setNewFleet] = useState<NewFleetForm>({
    name: "",
    company: "",
    region: "",
    status: "",
    description: "",
    headquarters: ""
  })

  const handleInputChange = (field: keyof NewFleetForm, value: string) => {
    setNewFleet(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!newFleet.name || !newFleet.company || !newFleet.region) {
      alert("Please fill in all required fields")
      return
    }

    // Call the callback function if provided
    if (onFleetAdd) {
      onFleetAdd(newFleet)
    }
    
    // Here you would typically send the data to your backend
    console.log("New fleet data:", newFleet)
    
    // Reset form and close modal
    setNewFleet({
      name: "",
      company: "",
      region: "",
      status: "",
      description: "",
      headquarters: ""
    })
    setIsModalOpen(false)
    
    // Show success message
    alert("Fleet added successfully!")
  }

  const handleCancel = () => {
    // Reset form when canceling
    setNewFleet({
      name: "",
      company: "",
      region: "",
      status: "",
      description: "",
      headquarters: ""
    })
    setIsModalOpen(false)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Fleet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Fleet</DialogTitle>
          <DialogDescription>
            Create a new fleet to organize and manage your ships effectively.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fleet Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Fleet Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Pacific Fleet"
                value={newFleet.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            

            {/* Region */}
            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Select value={newFleet.region} onValueChange={(value) => handleInputChange("region", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select operating region" />
                </SelectTrigger>
                <SelectContent>
                  {fleetRegions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newFleet.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {fleetStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Headquarters */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="headquarters">Headquarters</Label>
              <Select value={newFleet.headquarters} onValueChange={(value) => handleInputChange("headquarters", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select headquarters location" />
                </SelectTrigger>
                <SelectContent>
                  {headquarters.map(hq => (
                    <SelectItem key={hq} value={hq}>{hq}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the fleet's purpose, routes, or special characteristics..."
                value={newFleet.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Fleet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 