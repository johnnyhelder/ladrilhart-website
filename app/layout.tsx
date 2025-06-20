import './globals.css'
import { Toaster } from 'sonner'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata = {
  title: 'LADRILHART - Remodelações em Lisboa',
  description: 'Especialistas em remodelação de casas de banho e reformas gerais em Lisboa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="pt-[120px]">{children}</main>
          <Footer />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
} 