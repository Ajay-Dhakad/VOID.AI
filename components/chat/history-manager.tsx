"use client"

import { memo, useState } from "react"
import { Download, Trash2, Info, History, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useChat } from "@/hooks/useChat"

interface HistoryManagerProps {
  isOpen: boolean
  onClose: () => void
}

const HistoryManager = memo<HistoryManagerProps>(({ isOpen, onClose }) => {
  const { messages, clearMessages, exportHistory, getStorageInfo } = useChat()
  const [showConfirmClear, setShowConfirmClear] = useState(false)

  const storageInfo = getStorageInfo()

  if (!isOpen) return null

  const handleClearHistory = () => {
    clearMessages()
    setShowConfirmClear(false)
    onClose()
  }

  const handleExportHistory = () => {
    exportHistory()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="h-5 w-5" />
            Chat History
          </CardTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Storage Info */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Info className="h-4 w-4" />
              Storage Information
            </div>
            <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Messages:</span>
                <span className="font-mono">{storageInfo.messageCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Storage used:</span>
                <span className="font-mono">{storageInfo.storageSize} KB</span>
              </div>
              {storageInfo.isNearLimit && (
                <div className="text-amber-600 dark:text-amber-400 text-xs mt-2">
                  ⚠️ Approaching storage limit. Consider clearing old messages.
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleExportHistory}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={messages.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>

            {!showConfirmClear ? (
              <Button
                onClick={() => setShowConfirmClear(true)}
                variant="outline"
                className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                disabled={messages.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                  Are you sure? This action cannot be undone.
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleClearHistory} variant="destructive" className="flex-1">
                    Yes, Clear All
                  </Button>
                  <Button onClick={() => setShowConfirmClear(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Context Info */}
          <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <div className="font-medium mb-1">💡 How it works:</div>
            <ul className="space-y-1 list-disc list-inside">
              <li>Your conversations are saved locally in your browser</li>
              <li>AI uses recent message history for better context</li>
              <li>History persists between sessions</li>
              <li>Data never leaves your device unless you export it</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

HistoryManager.displayName = "HistoryManager"

export { HistoryManager }
