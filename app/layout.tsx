import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from './_providers/language'
import { AuthProvider } from './_providers/auth'
import { MainLayout } from './_components/main-layout'

export const metadata: Metadata = {
  title: 'WaterLog',
  description: 'WaterLog',
  generator: 'WaterLog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider initialLanguage="en">
          <AuthProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
