'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.min(100, Math.max(0, percentage)))
  }

  const features = [
    '500+ Projetos',
    '10+ Anos Experiência', 
    'Garantia Total',
    'Orçamento Grátis'
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 15px)`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto e CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isLoaded ? '100%' : 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-blue-500 mb-4"
              />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Transformamos
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
                  Casas de Banho
                </span>
                em Lisboa
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              Especialistas em remodelações com design moderno e execução impecável.
            </p>

            <div className="grid grid-cols-2 gap-4 py-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contato">
                <Button size="lg" className="group text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Ver Portfólio
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Slider Antes/Depois Melhorado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-2xl" />
            
            <div 
              className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize"
              onMouseMove={handleMouseMove}
              onTouchMove={(e) => {
                const touch = e.touches[0]
                const rect = e.currentTarget.getBoundingClientRect()
                const x = touch.clientX - rect.left
                const percentage = (x / rect.width) * 100
                setSliderPosition(Math.min(100, Math.max(0, percentage)))
              }}
            >
              {/* Imagem Antes */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop"
                  alt="Casa de banho antes da remodelação"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-gray-900 font-bold">ANTES</span>
                </div>
              </div>

              {/* Imagem Depois */}
              <div 
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop"
                  alt="Casa de banho depois da remodelação"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full">
                  <span className="font-bold">DEPOIS</span>
                </div>
              </div>

              {/* Linha divisória melhorada */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-xl"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-500 mt-6 font-medium">
              ↔ Arraste para comparar
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
