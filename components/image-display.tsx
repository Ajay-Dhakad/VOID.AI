"use client"

import { memo, useState } from "react"
import { Download, Copy, Sparkles, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useClipboard } from "@/hooks/useClipboard"
import { useToast } from "@/hooks/use-toast"
import { LoadingDots } from "@/components/ui/loading-dots"

interface ImageDisplayProps {
  imageUrl: string
  prompt: string
}

const ImageDisplay = memo<ImageDisplayProps>(({ imageUrl, prompt }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { copyToClipboard } = useClipboard()
  const { toast } = useToast()

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ai-generated-${Date.now()}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast({ title: "🎨 Image downloaded to quantum storage" })
    } catch (error) {
      toast({ title: "❌ Download failed", variant: "destructive" })
    }
  }

  const handleImageLoad = () => {
    setIsLoading(false)
    setImageError(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setImageError(true)
    toast({ title: "❌ Image failed to materialize", variant: "destructive" })
  }

  return (
    <>
      <div className="relative my-6 rounded-2xl overflow-hidden backdrop-blur-xl bg-black/20 border border-purple-500/30 group hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-900/60 via-pink-900/60 to-cyan-900/60 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-sm font-semibold text-white">AI Generated Artwork</span>
              <div className="text-xs text-gray-400">Quantum Neural Synthesis</div>
            </div>
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              onClick={() => copyToClipboard(imageUrl, "🔗 Image URL copied")}
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy URL
            </Button>
            <Button
              onClick={handleDownload}
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
            >
              <Download className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button
              onClick={() => setIsFullscreen(true)}
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>
        </div>

        {/* Enhanced Image Container */}
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
              <div className="flex flex-col items-center gap-4">
                <LoadingDots size="lg" color="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />
                <span className="text-sm text-gray-300 font-medium animate-pulse">Materializing pixels...</span>
              </div>
            </div>
          )}

          {!imageError ? (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={prompt}
              className="w-full h-auto max-h-96 object-contain transition-all duration-500 hover:scale-105"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-400">
              <div className="text-center">
                <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Failed to load image</p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Enhanced Prompt Display */}
        <div className="px-4 py-3 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm">
          <p className="text-xs text-gray-300 leading-relaxed">
            <span className="text-purple-400 font-semibold">Prompt:</span> <span className="italic">{prompt}</span>
          </p>
        </div>
      </div>

      {/* Enhanced Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={prompt}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
            <Button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/20 transition-all duration-200"
              size="sm"
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </>
  )
})

ImageDisplay.displayName = "ImageDisplay"

export { ImageDisplay }
