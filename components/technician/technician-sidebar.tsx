"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Ship,
  Beaker,
  FileText,
  TrendingUp,
  History,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface TechnicianSidebarProps {
  technician: {
    id: string
    name: string
    email: string
    currentShip: string
  }
  currentShipData?: {
    name: string
    status: string
  }
}

export function TechnicianSidebar({ technician, currentShipData }: TechnicianSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/technician",
      icon: Home,
      current: pathname === "/technician"
    },
    {
      name: "Current Ship",
      href: "/technician/ship",
      icon: Ship,
      current: pathname === "/technician/ship"
    },
    {
      name: "Water Analysis",
      href: "/technician/analysis",
      icon: Beaker,
      current: pathname === "/technician/analysis"
    },
    {
      name: "Reports",
      href: "/technician/reports",
      icon: FileText,
      current: pathname === "/technician/reports"
    },
    {
      name: "Trends",
      href: "/technician/trends",
      icon: TrendingUp,
      current: pathname === "/technician/trends"
    },
    {
      name: "Assignment History",
      href: "/technician/history",
      icon: History,
      current: pathname === "/technician/history"
    }
  ]

  const secondaryNavigation = [
    {
      name: "Settings",
      href: "/technician/settings",
      icon: Settings
    },
    {
      name: "Help",
      href: "/technician/help",
      icon: HelpCircle
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800"
      case "Attention": return "bg-yellow-100 text-yellow-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-semibold">
              WL
            </div>
            <div>
              <div className="text-sm font-semibold">WaterLog</div>
              <div className="text-xs text-muted-foreground">Technician</div>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
              {technician.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{technician.name}</div>
              <div className="text-xs text-muted-foreground truncate">{technician.email}</div>
            </div>
          )}
        </div>
      </div>

      {/* Current Ship Info */}
      {currentShipData && (
        <div className="p-4 border-b">
          {!collapsed ? (
            <div>
              <div className="text-xs text-muted-foreground mb-2">Current Assignment</div>
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{currentShipData.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getStatusColor(currentShipData.status)}>
                      {currentShipData.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative">
                <Ship className="h-6 w-6 text-blue-600" />
                {currentShipData.status === "Critical" && (
                  <AlertTriangle className="h-3 w-3 text-red-600 absolute -top-1 -right-1" />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
              item.current
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon
              className={cn(
                "flex-shrink-0 h-5 w-5",
                collapsed ? "mx-auto" : "mr-3",
                item.current ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
              )}
            />
            {!collapsed && item.name}
          </Link>
        ))}
      </nav>

      {/* Secondary Navigation */}
      <div className="border-t p-2 space-y-1">
        {secondaryNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <item.icon
              className={cn(
                "flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500",
                collapsed ? "mx-auto" : "mr-3"
              )}
            />
            {!collapsed && item.name}
          </Link>
        ))}
        
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            collapsed && "px-2"
          )}
        >
          <LogOut
            className={cn(
              "h-5 w-5 text-gray-400",
              collapsed ? "mx-auto" : "mr-3"
            )}
          />
          {!collapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  )
}
