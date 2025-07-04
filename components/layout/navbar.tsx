"use client"

import { memo, useEffect, useState } from "react"
import { MessageSquare, Menu, X, History, SunMoon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HistoryManager } from "@/components/chat/history-manager"
import VoidLogo from "../voidLooks/voidLogo"
import Link from "next/link"


const DarkLightComponent = () => {
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      htmlElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  return (
    <Button
      onClick={toggleDarkMode}
      variant="ghost"
      size="sm"
      className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
    >
      <SunMoon className="h-4 w-4" />
    </Button>
  )
}

const Navbar = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }


  useEffect(() => {

    const theme = localStorage.getItem("theme")
    if (theme) {
      document.documentElement.classList.add(theme)
    } else {
      document.documentElement.classList.add("dark")
    }

  },[])


  return (
    <>
      <nav className="bg-transparent backdrop-blur-3xl dark:bg-transparent border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
             <VoidLogo/>
              <div>
                <Link href={'/'} className="text-2xl font-bold text-slate-900 dark:text-white">VOID.<span className="text-red-600 dark:text-red-600">AI</span></Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <DarkLightComponent />
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
              <DarkLightComponent />
              <Button
                onClick={toggleMobileMenu}
                variant="ghost"
                size="sm"
                className="text-slate-600 dark:text-slate-300"
              >
                {isMobileMenuOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
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
