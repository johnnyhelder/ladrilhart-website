"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  FileText, 
  Tags, 
  Users, 
  Menu,
  X,
  LogOut,
  Home,
  Settings,
  PlusCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Posts', href: '/admin/posts', icon: FileText },
  { name: 'Categorias', href: '/admin/categories', icon: Tags },
  { name: 'Usuários', href: '/admin/users', icon: Users },
]

const quickActions = [
  { name: 'Novo Post', href: '/admin/posts/new', icon: PlusCircle },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Pegar o email do cookie para mostrar no menu
    const email = document.cookie
      .split('; ')
      .find(row => row.startsWith('user-email='))
      ?.split('=')[1]
    
    if (email) setUserEmail(decodeURIComponent(email))
  }, [])

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' })
    if (response.ok) {
      router.push('/login')
    }
  }

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 transform transition-transform lg:hidden",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <h2 className="text-lg font-semibold">LADRILHART Admin</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href, item.exact)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
            
            <div className="my-4 border-t pt-4">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Ações Rápidas
              </p>
              {quickActions.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-2"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="mb-3 px-3">
              <p className="text-xs text-gray-500">Logado como:</p>
              <p className="text-sm font-medium truncate">{userEmail}</p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-72 lg:bg-white lg:dark:bg-gray-800 lg:border-r">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center px-4 border-b">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Home className="h-5 w-5" />
              <h2 className="text-lg font-semibold">LADRILHART Admin</h2>
            </Link>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href, item.exact)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                  {item.name === 'Posts' && pathname === '/admin/posts' && (
                    <span className="ml-auto text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">
                      Ativo
                    </span>
                  )}
                </Link>
              )
            })}
            
            <div className="my-4 border-t pt-4">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Ações Rápidas
              </p>
              {quickActions.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-2"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="mb-3 px-3">
              <p className="text-xs text-gray-500">Logado como:</p>
              <p className="text-sm font-medium truncate">{userEmail}</p>
            </div>
            <Link href="/" className="block mb-2">
              <Button variant="outline" className="w-full justify-start">
                <Home className="h-4 w-4 mr-2" />
                Ver Site
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white dark:bg-gray-800 px-4 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg font-semibold">Painel Administrativo</h1>
            <div className="flex items-center gap-2">
              <Link href="/admin/posts/new" className="hidden sm:block">
                <Button size="sm" className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Novo Post
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Menu horizontal temporário para debug */}
        <div className="p-4 bg-yellow-100 text-yellow-800 flex gap-4">
          <Link href="/admin" className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Dashboard
          </Link>
          <Link href="/admin/posts" className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Posts
          </Link>
          <Link href="/admin/categories" className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Categorias
          </Link>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 