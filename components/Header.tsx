'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Início', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Portfólio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contato', href: '/contato' }
  ]

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 dark:bg-black text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+351965414792" className="flex items-center gap-2 hover:opacity-80">
              <Phone className="h-3 w-3" />
              +351 965 414 792
            </a>
            <a href="mailto:site@ladrilhart.pt" className="hidden sm:flex items-center gap-2 hover:opacity-80">
              <Mail className="h-3 w-3" />
              site@ladrilhart.pt
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Seg-Sex: 8h-18h</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-primary">LADRIL</span>
                <span className="text-gray-700">HART</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <ThemeToggle />
              <Button className="ml-4">
                Orçamento Gratuito
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t dark:border-gray-700">
            <div className="container mx-auto px-4 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex justify-between items-center mt-4">
                <ThemeToggle />
                <Button className="flex-1 ml-4">
                  Orçamento Gratuito
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
