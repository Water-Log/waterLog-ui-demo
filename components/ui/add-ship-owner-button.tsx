"use client"

import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

interface AddShipOwnerButtonProps {
  onClick?: () => void
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function AddShipOwnerButton({ 
  onClick, 
  className = "",
  variant = "default",
  size = "default"
}: AddShipOwnerButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Default behavior: log for development
      console.log("Add Ship Owner clicked")
    }
  }

  return (
    <Button 
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`flex items-center gap-2 ${className}`}
    >
      <UserPlus className="h-4 w-4" />
      Add Ship Owner
    </Button>
  )
}
