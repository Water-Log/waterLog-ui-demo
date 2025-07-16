import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from './_providers/language'
import { AuthProvider } from './_providers/auth'
import { MainLayout } from './_components/main-layout'
import { ThemeProvider } from '@/components/theme-provider'

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider initialLanguage="en">
            <AuthProvider>
              <MainLayout>
                {children}
              </MainLayout>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
