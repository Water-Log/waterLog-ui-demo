import { MainLayout } from "../_components/main-layout"

export default function ShipsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
} 