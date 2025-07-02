"use client"

import { useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export function useClipboard() {
  const { toast } = useToast()

  const copyToClipboard = useCallback(
    async (text: string, successMessage?: string) => {
      try {
        await navigator.clipboard.writeText(text)
        toast({
          title: successMessage || "📋 Copied to quantum clipboard",
          duration: 2000,
        })
        return true
      } catch (error) {
        toast({
          title: "❌ Copy failed",
          description: "Unable to access clipboard",
          variant: "destructive",
        })
        return false
      }
    },
    [toast],
  )

  return { copyToClipboard }
}
