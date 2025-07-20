"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Users, UserPlus, X, CheckCircle, MapPin, Phone, Mail } from "lucide-react"
import { shipOwners } from "@/lib/mock-data"

interface AssignShipOwnerModalProps {
  isOpen: boolean
  onClose: () => void
  onAssign: (selectedOwnerIds: string[]) => void
  fleetId: string
  fleetName: string
  currentlyAssignedOwnerIds: string[]
}

export function AssignShipOwnerModal({
  isOpen,
  onClose,
  onAssign,
  fleetId,
  fleetName,
  currentlyAssignedOwnerIds
}: AssignShipOwnerModalProps) {
  const [selectedOwnerIds, setSelectedOwnerIds] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Filter available ship owners (not currently assigned to this fleet)
  const availableOwners = shipOwners.filter(owner => 
    !currentlyAssignedOwnerIds.includes(owner.id)
  )

  // Filter by search term
  const filteredOwners = availableOwners.filter(owner =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOwnerToggle = (ownerId: string) => {
    setSelectedOwnerIds(prev =>
      prev.includes(ownerId)
        ? prev.filter(id => id !== ownerId)
        : [...prev, ownerId]
    )
  }

  const handleAssign = () => {
    onAssign(selectedOwnerIds)
    setSelectedOwnerIds([])
    setSearchTerm("")
    onClose()
  }

  const handleClose = () => {
    setSelectedOwnerIds([])
    setSearchTerm("")
    onClose()
  }

  const getStatusColors = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-800"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Assign Ship Owners to {fleetName}
          </DialogTitle>
          <DialogDescription>
            Select ship owners to assign to this fleet. You can assign multiple owners at once.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search by name, email, specialization, or license..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected Count */}
          {selectedOwnerIds.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
              <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {selectedOwnerIds.length} ship owner{selectedOwnerIds.length > 1 ? 's' : ''} selected
              </span>
            </div>
          )}

          <Separator />

          {/* Available Ship Owners List */}
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center gap-2 mb-3 flex-shrink-0">
              <Users className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
              <Label className="text-sm font-medium">
                Available Ship Owners ({filteredOwners.length})
              </Label>
            </div>

            <ScrollArea className="h-[400px] w-full pr-4">
              {filteredOwners.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50 text-gray-400 dark:text-gray-500" />
                  <p className="text-sm">
                    {searchTerm ? "No ship owners found matching your search." : "No available ship owners to assign."}
                  </p>
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchTerm("")}
                      className="mt-2"
                    >
                      Clear search
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-3 pb-4">
                  {filteredOwners.map((owner) => (
                    <div
                      key={owner.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedOwnerIds.includes(owner.id)
                          ? "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/50"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                      onClick={() => handleOwnerToggle(owner.id)}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <Checkbox
                          checked={selectedOwnerIds.includes(owner.id)}
                          onChange={() => handleOwnerToggle(owner.id)}
                          className="mt-1 flex-shrink-0"
                        />
                        
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-lg truncate">{owner.name}</h4>
                              <p className="text-sm text-muted-foreground truncate">{owner.specialization}</p>
                            </div>
                            <Badge className={`${getStatusColors(owner.status)} flex-shrink-0`}>
                              {owner.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2 min-w-0">
                              <Mail className="h-3 w-3 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                              <span className="truncate">{owner.email}</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <Phone className="h-3 w-3 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                              <span className="truncate">{owner.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <MapPin className="h-3 w-3 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                              <span className="truncate">{owner.nationality}</span>
                            </div>
                            <div className="min-w-0">
                              <span className="font-medium">License:</span> 
                              <span className="ml-1 truncate inline-block max-w-[150px]">{owner.licenseNumber}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="whitespace-nowrap">
                              Experience: <span className="font-medium">{owner.experience}</span>
                            </span>
                            <span className="whitespace-nowrap">
                              Joined: <span className="font-medium">{new Date(owner.joinDate).toLocaleDateString()}</span>
                            </span>
                            {owner.assignedFleets.length > 0 && (
                              <span className="whitespace-nowrap">
                                Assigned to <span className="font-medium">{owner.assignedFleets.length}</span> fleet{owner.assignedFleets.length > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={selectedOwnerIds.length === 0}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Assign {selectedOwnerIds.length > 0 ? `${selectedOwnerIds.length} ` : ''}Ship Owner{selectedOwnerIds.length > 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 