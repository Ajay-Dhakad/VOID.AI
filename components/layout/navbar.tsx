"use client"

import { memo, useState } from "react"
import { MessageSquare, Menu, X, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HistoryManager } from "@/components/chat/history-manager"
import VoidLogo from "../voidLooks/voidLogo"

const Navbar = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
             <VoidLogo/>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">VOID.<span className="text-red-600 dark:text-slate-300">AI</span></h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                onClick={() => setIsHistoryOpen(true)}
                variant="ghost"
                size="sm"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                onClick={toggleMobileMenu}
                variant="ghost"
                size="sm"
                className="text-slate-600 dark:text-slate-300"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 dark:border-slate-700 py-4">
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    setIsHistoryOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  variant="ghost"
                  className="w-full justify-start text-slate-600 dark:text-slate-300"
                >
                  <History className="h-4 w-4 mr-3" />
                  History
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* History Manager Modal */}
      <HistoryManager isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </>
  )
})

Navbar.displayName = "Navbar"

export { Navbar }
