"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { AddShipOwnerModal } from "@/components/ui/add-ship-owner-modal"

interface AddShipOwnerButtonProps {
  onShipOwnerAdd?: (shipOwnerData: {
    fullName: string
    phoneNumber: string
    email: string
    status: string
  }) => void
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  hideIcon?: boolean
  id?: string
}

export function AddShipOwnerButton({ 
  onShipOwnerAdd,
  className = "",
  variant = "default",
  size = "default",
  hideIcon = false,
  id
}: AddShipOwnerButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAdd = (shipOwnerData: {
    fullName: string
    phoneNumber: string
    email: string
    status: string
  }) => {
    onShipOwnerAdd?.(shipOwnerData)
    // For development, log the data
    console.log("Ship owner added:", shipOwnerData)
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        id={id}
        variant={variant}
        size={size}
        className={`flex items-center ${hideIcon ? '' : 'gap-2'} ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        {!hideIcon && <UserPlus className="h-4 w-4" />}
        Add Ship Owner
      </Button>

      <AddShipOwnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
    </>
  )
}
