"use client"

import { useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export function useSpeech() {
  const { toast } = useToast()

  const speak = useCallback(
    (text: string) => {
      try {
        window.speechSynthesis.cancel()
        const cleanText = text.replace(/```[\s\S]*?```/g, "code block").replace(/[#*`]/g, "")
        const utterance = new SpeechSynthesisUtterance(cleanText)

        utterance.rate = 0.9
        utterance.pitch = 1
        utterance.volume = 0.8

        window.speechSynthesis.speak(utterance)
        toast({
          title: "🔊 Neural voice synthesis activated",
          duration: 2000,
        })
      } catch (error) {
        toast({
          title: "❌ Speech synthesis failed",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  return { speak }
}
