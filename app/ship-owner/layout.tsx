"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ShipOwnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Ship Owner Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your ships, fleets and crew
        </p>
      </div>

      <Tabs value={pathname.includes("/crew") ? "/ship-owner/crew" : "/ship-owner"} className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-2">
          <TabsTrigger asChild value="/ship-owner">
            <Link href="/ship-owner">Overview</Link>
          </TabsTrigger>
          <TabsTrigger asChild value="/ship-owner/crew">
            <Link href="/ship-owner/crew">Crew</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div>{children}</div>
    </div>
  )
}
