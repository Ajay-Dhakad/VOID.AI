"use client"

import type React from "react"
import { memo } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

const ProtectedRoute = memo<ProtectedRouteProps>(({ children }) => {
  return <>{children}</>
})

ProtectedRoute.displayName = "ProtectedRoute"

export { ProtectedRoute }
