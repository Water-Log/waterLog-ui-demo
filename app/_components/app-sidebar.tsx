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
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Ships",
    url: "/ships",
    icon: Ship,
  },
  {
    title: "Crew",
    url: "/crew",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Schedules",
    url: "/schedules",
    icon: Calendar,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Tracking",
    url: "/tracking",
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

export function AppSidebar() {
  const pathname = usePathname()
  const isManagerRoute = pathname?.startsWith('/manager')
  const items = isManagerRoute ? managerItems : shipOwnerItems

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