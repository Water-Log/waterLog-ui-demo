"use client"

import * as React from "react"
import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

type SidebarBehavior = "expanded" | "collapsed" | "hover"

export function SidebarSettings() {
  const { state, setOpen } = useSidebar()
  const [behavior, setBehavior] = React.useState<SidebarBehavior>("collapsed")
  const [isHoverMode, setIsHoverMode] = React.useState(false)

  React.useEffect(() => {
    const handleMouseEnter = () => {
      if (behavior === "hover" && state === "collapsed") {
        setIsHoverMode(true)
        setOpen(true)
      }
    }

    const handleMouseLeave = () => {
      if (behavior === "hover" && isHoverMode) {
        setIsHoverMode(false)
        setOpen(false)
      }
    }

    if (behavior === "hover") {
      const sidebar = document.querySelector('[data-sidebar="sidebar"]')
      if (sidebar) {
        sidebar.addEventListener('mouseenter', handleMouseEnter)
        sidebar.addEventListener('mouseleave', handleMouseLeave)
        return () => {
          sidebar.removeEventListener('mouseenter', handleMouseEnter)
          sidebar.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, [behavior, state, setOpen, isHoverMode])

  const handleBehaviorChange = (value: SidebarBehavior) => {
    setBehavior(value)
    setIsHoverMode(false)
    
    switch (value) {
      case "expanded":
        setOpen(true)
        break
      case "collapsed":
        setOpen(false)
        break
      case "hover":
        setOpen(false)
        break
    }
  }
  <SidebarSettings />
  return (
   
    <Popover>
      
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Settings2 className="h-4 w-4" />
          <span className="sr-only">Sidebar settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Sidebar control</h4>
          </div>
          <RadioGroup
            value={behavior}
            onValueChange={handleBehaviorChange}
            className="grid gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expanded" id="expanded" />
              <Label htmlFor="expanded" className="text-sm font-normal">
                Expanded
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="collapsed" id="collapsed" />
              <Label htmlFor="collapsed" className="text-sm font-normal">
                Collapsed
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hover" id="hover" />
              <Label htmlFor="hover" className="text-sm font-normal">
                Expand on hover
              </Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  )
} 