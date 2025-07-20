"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserCheck } from "lucide-react"
import { AssignShipOwnerModal } from "@/components/fleet/assign-ship-owner-modal"

interface AssignShipOwnerButtonProps {
  fleetId: string
  fleetName: string
  currentlyAssignedOwnerIds: string[]
  onAssign: (selectedOwnerIds: string[]) => void
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function AssignShipOwnerButton({ 
  fleetId,
  fleetName,
  currentlyAssignedOwnerIds,
  onAssign,
  className = "",
  variant = "default",
  size = "default"
}: AssignShipOwnerButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAssign = (selectedOwnerIds: string[]) => {
    onAssign(selectedOwnerIds)
    setIsModalOpen(false)
  }

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        variant={variant}
        size={size}
        className={`flex items-center gap-2 ${className}`}
      >
        <UserCheck className="h-4 w-4" />
        Assign Ship Owner
      </Button>

      <AssignShipOwnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAssign={handleAssign}
        fleetId={fleetId}
        fleetName={fleetName}
        currentlyAssignedOwnerIds={currentlyAssignedOwnerIds}
      />
    </>
  )
}
