"use client"

import { memo } from "react"
import { Code2, ImageIcon, Brain, Zap, FileText, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { QuickPrompt } from "@/types/chat"

interface QuickPromptsProps {
  onPromptSelect: (prompt: string) => void
}

const quickPrompts: QuickPrompt[] = [
  {
    icon: Code2,
    text: "Code Review",
    prompt: "Review this code and suggest improvements for better performance and readability",
    gradient: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  },
  {
    icon: ImageIcon,
    text: "Generate Image",
    prompt: "Generate image of a professional business meeting in a modern office",
    gradient: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
  },
  {
    icon: Brain,
    text: "Explain Concepts",
    prompt: "Explain machine learning concepts in simple terms with practical examples",
    gradient: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  },
  {
    icon: Zap,
    text: "Optimize Code",
    prompt: "Help me optimize this function for better performance and maintainability",
    gradient: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
  },
  {
    icon: FileText,
    text: "Write Documentation",
    prompt: "Help me write comprehensive documentation for this API endpoint",
    gradient: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
  },
  {
    icon: HelpCircle,
    text: "Problem Solving",
    prompt: "Help me solve this technical problem step by step with best practices",
    gradient: "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800",
  },
]

const QuickPrompts = memo<QuickPromptsProps>(({ onPromptSelect }) => {
  return (
    <div className="text-center py-8 md:py-16">
      <div className="mb-8">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center mb-4 shadow-lg">
          <HelpCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">AI Assistant</h3>
        <p className="text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
          Get help with coding, writing, analysis, and creative tasks. Choose a prompt below or start your own
          conversation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        {quickPrompts.map((prompt, i) => (
          <Button
            key={i}
            variant="outline"
            className={`h-auto p-6 md:p-8 ${prompt.gradient} hover:shadow-lg transition-all duration-200 hover:scale-105 group relative overflow-hidden text-left border-2`}
            onClick={() => onPromptSelect(prompt.prompt)}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md">
                <prompt.icon className="h-6 w-6 md:h-7 md:w-7 text-slate-800 dark:text-slate-200" />
              </div>

              <div>
                <div className="font-bold text-slate-900 dark:text-white text-base md:text-lg mb-2">{prompt.text}</div>
                <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  Click to get started
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
})

QuickPrompts.displayName = "QuickPrompts"

export { QuickPrompts }
