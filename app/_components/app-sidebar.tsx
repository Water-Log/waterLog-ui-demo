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

// Menu items for shipowners
const shipOwnerItems = [
  {
    title: "Dashboard",
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
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

// Menu items for managers
const managerItems = [
  {
    title: "Dashboard",
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
    title: "Analytics",
    url: "/manager/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

// Menu items for technicians
const technicianItems = [
  {
    title: "Dashboard",
    url: "/technician",
    icon: Home,
  },
  {
    title: "Ships",
    url: "/technician/ships",
    icon: Ship,
  },
  {
    title: "Analysis",
    url: "/technician/water-analysis",
    icon: Beaker,
  },
  {
    title: "Chemicals",
    url: "/technician/chemicals",
    icon: Droplets,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  }
]

// Desktop Sidebar Component
export function DesktopSidebar() {
  const pathname = usePathname()
  const isManagerRoute = pathname?.startsWith('/manager')
  const isTechnicianRoute = pathname?.startsWith('/technician')
  
  let allItems = [
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

  if (isManagerRoute) {
    allItems = [
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
  } else if (isTechnicianRoute) {
    allItems = [
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
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-2">
        <div className="px-2 pb-4">
          <SidebarTrigger className="mb-4" />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:sr-only">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allItems.map((item) => (
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

// Mobile Bottom Navigation Component
export function MobileBottomNav() {
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg md:hidden">
      <div className="flex justify-around items-center py-2 px-1">
        {items.map((item) => {
          const isActive = pathname === item.url
          return (
            <a
              key={item.title}
              href={item.url}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs text-center truncate">{item.title}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

// Main component for backward compatibility
export function AppSidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileBottomNav />
    </>
  )
} 