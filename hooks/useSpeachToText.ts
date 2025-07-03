// hooks/useSpeechInput.ts
import { useEffect, useRef, useState } from "react"

type UseSpeechInputReturn = {
  transcript: string
  isListening: boolean
  toggleListening: () => void
  resetTranscript: () => void
}


declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export const useSpeechInput = (): UseSpeechInputReturn => {
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<any | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.lang = "en-US"
        recognition.continuous = false
        recognition.interimResults = false

        recognition.onresult = (event:any) => {
          const result = event.results[0][0].transcript
          setTranscript((prev) => `${prev} ${result}`)
          setIsListening(false)
        }

        recognition.onerror = () => setIsListening(false)
        recognition.onend = () => setIsListening(false)

        recognitionRef.current = recognition
      }
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) return
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setTranscript("")
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const resetTranscript = () => setTranscript("")

  return {
    transcript,
    isListening,
    toggleListening,
    resetTranscript,
  }
}
