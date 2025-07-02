import type React from "react"
export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isImage?: boolean
  imageUrl?: string
  imagePrompt?: string
}

export interface QuickPrompt {
  icon: React.ComponentType<{ className?: string }>
  text: string
  prompt: string
  gradient: string
}

export interface ApiResponse {
  message: string
  isImage?: boolean
  imageUrl?: string
  imagePrompt?: string
  error?: string
}
