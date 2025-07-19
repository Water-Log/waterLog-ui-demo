"use client"

import {
  BarChart3,
  Home,
  Settings,
  Ship,
  Users,
  Calendar,
  FileText,
  MapPin,
  Building2,
  Beaker,
  History,
  Droplets,
} from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarSettings } from "@/components/sidebar-settings"

// Menu items for shipowners
const shipOwnerItems = [
  {
    title: "Shipowner Dashboard",
    url: "/shipowner",
    icon: Home,
  },
  {
    title: "Ships",
    url: "/shipowner/ships",
    icon: Ship,
  },
  {
    title: "Crew",
    url: "/shipowner/crew",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/shipowner/analytics",
    icon: BarChart3,
  },
  {
    title: "Schedules",
    url: "/shipowner/schedules",
    icon: Calendar,
  },
  {
    title: "Reports",
    url: "/shipowner/reports",
    icon: FileText,
  },
  {
    title: "Tracking",
    url: "/shipowner/tracking",
    icon: MapPin,
  },
]

// Menu items for managers
const managerItems = [
  {
    title: "Manager Dashboard",
    url: "/manager",
    icon: Home,
  },
  {
    title: "Fleets",
    url: "/manager/fleets",
    icon: Building2,
  },
  {
    title: "Ship Owners",
    url: "/manager/ship-owners",
    icon: Users,
  },
  {
    title: "Fleet Analytics",
    url: "/manager/analytics",
    icon: BarChart3,
  },
  {
    title: "Fleet Reports",
    url: "/manager/reports",
    icon: FileText,
  },
]

// Menu items for technicians
const technicianItems = [
  {
    title: "Technician Dashboard",
    url: "/technician",
    icon: Home,
  },
  {
    title: "Ships",
    url: "/technician/ships",
    icon: Ship,
  },
  {
    title: "Water Analysis",
    url: "/technician/water-analysis",
    icon: Beaker,
  },
  {
    title: "Chemical Additions",
    url: "/technician/chemicals",
    icon: Droplets,
  },
  {
    title: "Reports",
    url: "/technician/reports",
    icon: FileText,
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const isManagerRoute = pathname?.startsWith('/manager')
  const isTechnicianRoute = pathname?.startsWith('/technician')
  
  let items = shipOwnerItems
  if (isManagerRoute) {
    items = managerItems
  } else if (isTechnicianRoute) {
    items = technicianItems
  }

  return (
    <Sidebar 
      collapsible="icon" 
    >
      <SidebarContent className="pt-2">
        <div className="px-2 pb-4">
          <SidebarTrigger className="mb-4" />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:sr-only">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <a href="/settings">
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
} 