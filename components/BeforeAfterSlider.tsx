'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="relative overflow-hidden rounded-xl shadow-2xl">
        <div className="relative h-96 md:h-[500px]">
          {/* Before Image */}
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🚿</div>
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">ANTES</div>
            </div>
          </div>

          {/* After Image */}
          <div 
            className="absolute inset-0 overflow-hidden bg-blue-900 dark:bg-blue-800 flex items-center justify-center"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <div className="text-2xl font-bold text-white">DEPOIS</div>
            </div>
          </div>

          {/* Slider Control */}
          <div className="absolute inset-0">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute top-1/2 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer"
              style={{ transform: 'translateY(-50%)' }}
            />
            <div 
              className="absolute top-0 bottom-0 bg-white/20 w-1"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-200 rounded-full shadow-lg flex items-center justify-center">
                <ChevronLeft size={12} className="text-gray-600" />
                <ChevronRight size={12} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
        Arraste o controle para ver a transformação completa
      </p>
    </div>
  )
}
