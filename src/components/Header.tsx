'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import DarkModeToggle from './DarkModeToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#inicio" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Início</a>
            <a href="#sobre" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Sobre</a>
            <a href="#servicos" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Serviços</a>
            <a href="#portfolio" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Portfólio</a>
            <a href="#blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Blog</a>
            <a href="#contato" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Contato</a>
            <DarkModeToggle />
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <DarkModeToggle />
            <button 
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#inicio" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Início</a>
              <a href="#sobre" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Sobre</a>
              <a href="#servicos" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Serviços</a>
              <a href="#portfolio" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Portfólio</a>
              <a href="#blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Blog</a>
              <a href="#contato" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Contato</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
