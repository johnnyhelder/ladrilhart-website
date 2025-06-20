interface LogoProps {
  className?: string
  color?: string
}

export default function Logo({ className = "h-12 w-auto", color }: LogoProps) {
  const defaultColor = color || "#D4A853"
  
  return (
    <div className={`flex items-center ${className}`}>
      <svg width="60" height="60" viewBox="0 0 100 100" className="mr-4">
        <g stroke={defaultColor} strokeWidth="3" fill="none">
          <path d="M50 10 L70 25 L70 45 L50 60 L30 45 L30 25 Z" />
          <path d="M40 25 L50 35 L60 25 L60 45 L50 55 L40 45 Z" />
          <path d="M45 30 L50 25 L55 30 L55 40 L50 45 L45 40 Z" />
        </g>
      </svg>
      <span className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
        LADRILHART
      </span>
    </div>
  )
}
