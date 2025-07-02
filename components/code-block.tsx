"use client"

import { Copy, Terminal, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = "text" }: CodeBlockProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({ title: "Code copied to clipboard" })
    } catch {
      toast({
        title: "Failed to copy code",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="relative my-4 rounded-lg overflow-hidden bg-slate-900 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm font-mono text-slate-600 dark:text-slate-400 uppercase">{language}</span>
        </div>
        <Button
          onClick={handleCopy}
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Code Content */}
      <div className="relative">
        <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 text-sm leading-relaxed overflow-x-auto p-4 m-0">
          <code className="whitespace-pre font-mono block">{code.trimEnd()}</code>
        </pre>
      </div>
    </div>
  )
}
