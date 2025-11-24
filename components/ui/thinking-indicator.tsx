"use client"

import { memo, useEffect, useState } from "react"
import { Brain, Sparkles, Zap, Code2, Lightbulb } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ThinkingIndicatorProps {
  variant?: "default" | "analyzing" | "coding" | "creative"
  showProgress?: boolean
  estimatedTime?: number // in seconds
}

const thinkingStates = [
  { text: "Thinking", icon: Brain, color: "text-purple-500" },
  { text: "Analyzing", icon: Sparkles, color: "text-cyan-500" },
  { text: "Processing", icon: Zap, color: "text-yellow-500" },
  { text: "Crafting response", icon: Lightbulb, color: "text-orange-500" },
]

const ThinkingIndicator = memo<ThinkingIndicatorProps>(
  ({ variant = "default", showProgress = false, estimatedTime = 0 }) => {
    const [currentStateIndex, setCurrentStateIndex] = useState(0)
    const [progress, setProgress] = useState(0)

    // Rotate through thinking states
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentStateIndex((prev) => (prev + 1) % thinkingStates.length)
      }, 2000)

      return () => clearInterval(interval)
    }, [])

    // Simulate progress
    useEffect(() => {
      if (!showProgress) return

      const increment = 100 / (estimatedTime * 10) // Update every 100ms
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return 95 // Cap at 95% until actual completion
          return prev + increment
        })
      }, 100)

      return () => clearInterval(interval)
    }, [showProgress, estimatedTime])

    const currentState = thinkingStates[currentStateIndex]
    const Icon = currentState.icon

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {/* Animated Icon */}
          <motion.div
            key={currentStateIndex}
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Icon className={`w-5 h-5 ${currentState.color}`} />
            {/* Pulse ring */}
            <motion.div
              className={`absolute inset-0 rounded-full ${currentState.color.replace('text', 'bg')} opacity-20`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Animated Dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${currentState.color.replace('text', 'bg')}`}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Thinking Text */}
          <AnimatePresence mode="wait">
            <motion.span
              key={currentStateIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-slate-700 dark:text-slate-200 font-medium"
            >
              {currentState.text}...
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        {showProgress && estimatedTime > 0 && (
          <div className="w-full">
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 bg-[length:200%_100%]"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${progress}%`,
                  backgroundPosition: ['0% 0%', '100% 0%']
                }}
                transition={{ 
                  width: { duration: 0.3 },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {Math.round(progress)}% complete
            </p>
          </div>
        )}
      </div>
    )
  }
)

ThinkingIndicator.displayName = "ThinkingIndicator"

export { ThinkingIndicator }
