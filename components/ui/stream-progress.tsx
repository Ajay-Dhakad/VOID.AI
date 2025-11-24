"use client"

import { memo } from "react"
import { motion } from "framer-motion"

interface StreamProgressProps {
  progress: number
  variant?: "bar" | "circle" | "dots"
  showPercentage?: boolean
  className?: string
}

const StreamProgress = memo<StreamProgressProps>(
  ({ progress, variant = "bar", showPercentage = false, className = "" }) => {
    if (variant === "circle") {
      const circumference = 2 * Math.PI * 18 // radius = 18
      const offset = circumference - (progress / 100) * circumference

      return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
          <svg className="w-12 h-12 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r="18"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-slate-200 dark:text-slate-700"
            />
            {/* Progress circle */}
            <motion.circle
              cx="24"
              cy="24"
              r="18"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.3 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          {showPercentage && (
            <span className="absolute text-xs font-semibold text-slate-700 dark:text-slate-300">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )
    }

    if (variant === "dots") {
      return (
        <div className={`flex gap-1.5 ${className}`}>
          {[...Array(10)].map((_, i) => {
            const isActive = (i + 1) * 10 <= progress
            return (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                    : "bg-slate-200 dark:bg-slate-700"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1 : 0.8 }}
                transition={{ duration: 0.2 }}
              />
            )
          })}
        </div>
      )
    }

    // Default: bar variant
    return (
      <div className={`w-full ${className}`}>
        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 bg-[length:200%_100%] rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${progress}%`,
              backgroundPosition: ['0% 0%', '100% 0%']
            }}
            transition={{ 
              width: { duration: 0.3, ease: "easeOut" },
              backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
        </div>
        {showPercentage && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">
            {Math.round(progress)}%
          </p>
        )}
      </div>
    )
  }
)

StreamProgress.displayName = "StreamProgress"

export { StreamProgress }
