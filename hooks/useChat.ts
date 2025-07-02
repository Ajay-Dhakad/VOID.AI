"use client"

import { useState, useCallback, useEffect } from "react"
import type { Message, ApiResponse } from "@/types/chat"
import { useToast } from "@/hooks/use-toast"

const STORAGE_KEY = "ai-chat-history"
const MAX_MESSAGES = 100 // Limit to prevent localStorage from getting too large

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Load messages from localStorage on initialization
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY)
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages)
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      }
    } catch (error) {
      console.error("Failed to load chat history:", error)
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        // Keep only the most recent messages to prevent storage overflow
        const messagesToSave = messages.slice(-MAX_MESSAGES)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToSave))
      } catch (error) {
        console.error("Failed to save chat history:", error)
        toast({
          title: "Storage Warning",
          description: "Unable to save chat history. Storage may be full.",
          variant: "destructive",
        })
      }
    }
  }, [messages, toast])

  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      if (!content.trim()) return

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        // Include conversation history for context
        const conversationHistory = [...messages, userMessage]

        // Send only the last 20 messages to avoid token limits
        const recentHistory = conversationHistory.slice(-20)

        const apiMessages = recentHistory.map(({ role, content }) => ({
          role,
          content,
        }))

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages,mode: localStorage.getItem("botMode") || "VOID" }),
        })

        if (!response.ok) {
   toast({
          title: "Connection Error",
          description: "Failed to get AI response. Please try again.",
          variant: "destructive",
        })        }

        const data: ApiResponse = await response.json()

        if (data.error) {
   toast({
          title: "Connection Error",
          description: "Failed to get AI response. Please try again.",
          variant: "destructive",
        })        }

        const aiMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
          isImage: data.isImage,
          imageUrl: data.imageUrl,
          imagePrompt: data.imagePrompt,
        }

        setMessages((prev) => [...prev, aiMessage])
      } catch (error) {
        console.error("Chat error:", error)
        toast({
          title: "Connection Error",
          description: "Failed to get AI response. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [messages, toast],
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
    toast({
      title: "History Cleared",
      description: "All conversation history has been deleted.",
    })
  }, [toast])

  const exportHistory = useCallback(() => {
    try {
      const historyText = messages
        .map((msg) => {
          const timestamp = msg.timestamp.toLocaleString()
          const role = msg.role === "user" ? "You" : "AI Assistant"
          return `[${timestamp}] ${role}: ${msg.content}`
        })
        .join("\n\n")

      const blob = new Blob([historyText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ai-chat-history-${new Date().toISOString().split("T")[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "History Exported",
        description: "Your conversation history has been downloaded.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export conversation history.",
        variant: "destructive",
      })
    }
  }, [messages, toast])

  const getStorageInfo = useCallback(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY)
      const sizeInBytes = savedMessages ? new Blob([savedMessages]).size : 0
      const sizeInKB = Math.round(sizeInBytes / 1024)
      return {
        messageCount: messages.length,
        storageSize: sizeInKB,
        isNearLimit: messages.length > MAX_MESSAGES * 0.8,
      }
    } catch {
      return {
        messageCount: messages.length,
        storageSize: 0,
        isNearLimit: false,
      }
    }
  }, [messages])

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    exportHistory,
    getStorageInfo,
  }
}
