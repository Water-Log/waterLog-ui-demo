"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DesktopSidebar, MobileBottomNav } from "./app-sidebar"
import { Header } from "./header"
import { usePathname } from "next/navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  
  // Auth sayfalarında sidebar ve header gösterme
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/create-account'
  
  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        <SidebarProvider defaultOpen={false}>
          <DesktopSidebar />
          <SidebarInset className="flex-1">
            <Header />
            <main className="flex-1 overflow-auto p-4">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-auto p-4 pb-20">
          {children}
        </main>
        <MobileBottomNav />
      </div>
    </>
  )
} 