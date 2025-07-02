"use client"

import { memo } from "react"

interface LoadingDotsProps {
  size?: "sm" | "md" | "lg"
  color?: string
}

const LoadingDots = memo<LoadingDotsProps>(
  ({ size = "md", color = "bg-gradient-to-r from-purple-500 to-cyan-500" }) => {
    const sizeClasses = {
      sm: "w-1 h-1",
      md: "w-2 h-2",
      lg: "w-3 h-3",
    }

    return (
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${sizeClasses[size]} ${color} rounded-full animate-bounce`}
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    )
  },
)

LoadingDots.displayName = "LoadingDots"

export { LoadingDots }
