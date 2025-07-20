"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

// Ship types and statuses for select options
const shipTypes = ["Container Ship", "Bulk Carrier", "Tanker", "General Cargo", "RoRo", "Cruise Ship"]
const shipStatuses = ["Active", "In Transit", "Maintenance", "Docked"]
const flags = ["Panama", "Liberia", "Marshall Islands", "Singapore", "Cyprus", "Malta", "Bahamas", "Norway", "Turkey", "Germany"]

interface NewShipForm {
  name: string
  type: string
  imo: string
  flag: string
  status: string
  location: string
  capacity: string
  captain: string
  yearBuilt: string
}

interface AddShipModalProps {
  onShipAdd?: (shipData: NewShipForm) => void
}

export function AddShipModal({ onShipAdd }: AddShipModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newShip, setNewShip] = useState<NewShipForm>({
    name: "",
    type: "",
    imo: "",
    flag: "",
    status: "",
    location: "",
    capacity: "",
    captain: "",
    yearBuilt: ""
  })

  const handleInputChange = (field: keyof NewShipForm, value: string) => {
    setNewShip(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!newShip.name || !newShip.type || !newShip.imo || !newShip.captain) {
      alert("Please fill in all required fields")
      return
    }

    // Call the callback function if provided
    if (onShipAdd) {
      onShipAdd(newShip)
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just log it and close the modal
    console.log("New ship data:", newShip)
    
    // Reset form and close modal
    setNewShip({
      name: "",
      type: "",
      imo: "",
      flag: "",
      status: "",
      location: "",
      capacity: "",
      captain: "",
      yearBuilt: ""
    })
    setIsModalOpen(false)
    
    // Show success message
    alert("Ship added successfully!")
  }

  const handleCancel = () => {
    // Reset form when canceling
    setNewShip({
      name: "",
      type: "",
      imo: "",
      flag: "",
      status: "",
      location: "",
      capacity: "",
      captain: "",
      yearBuilt: ""
    })
    setIsModalOpen(false)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Ship
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Ship</DialogTitle>
          <DialogDescription>
            Enter the details for the new ship in your fleet.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ship Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Ship Name *</Label>
              <Input
                id="name"
                placeholder="e.g., MV Atlantic Pioneer"
                value={newShip.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            {/* Ship Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Ship Type *</Label>
              <Select value={newShip.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ship type" />
                </SelectTrigger>
                <SelectContent>
                  {shipTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* IMO Number */}
            <div className="space-y-2">
              <Label htmlFor="imo">IMO Number *</Label>
              <Input
                id="imo"
                placeholder="e.g., 9234567"
                value={newShip.imo}
                onChange={(e) => handleInputChange("imo", e.target.value)}
                required
              />
            </div>

            {/* Flag */}
            <div className="space-y-2">
              <Label htmlFor="flag">Flag State</Label>
              <Select value={newShip.flag} onValueChange={(value) => handleInputChange("flag", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select flag state" />
                </SelectTrigger>
                <SelectContent>
                  {flags.map(flag => (
                    <SelectItem key={flag} value={flag}>{flag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newShip.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {shipStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Current Location</Label>
              <Input
                id="location"
                placeholder="e.g., Port of Rotterdam"
                value={newShip.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            {/* Capacity */}
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                placeholder="e.g., 18,000 TEU or 75,000 DWT"
                value={newShip.capacity}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
              />
            </div>

            {/* Captain */}
            <div className="space-y-2">
              <Label htmlFor="captain">Captain *</Label>
              <Input
                id="captain"
                placeholder="e.g., Captain James Morrison"
                value={newShip.captain}
                onChange={(e) => handleInputChange("captain", e.target.value)}
                required
              />
            </div>

            {/* Year Built */}
            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input
                id="yearBuilt"
                type="number"
                placeholder="e.g., 2019"
                min="1900"
                max={new Date().getFullYear()}
                value={newShip.yearBuilt}
                onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
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
              Add Ship
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 