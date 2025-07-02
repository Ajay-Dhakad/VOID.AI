"use client"

import type React from "react"
import { memo } from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "accent"
}

const GradientText = memo<GradientTextProps>(({ children, className, variant = "primary" }) => {
  const variants = {
    primary: "text-slate-900 dark:text-white",
    secondary: "text-slate-600 dark:text-slate-300",
    accent: "text-blue-600 dark:text-blue-400",
  }

  return <span className={cn("font-semibold", variants[variant], className)}>{children}</span>
})

GradientText.displayName = "GradientText"

export { GradientText }
