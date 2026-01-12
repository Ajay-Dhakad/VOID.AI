"use client";

import { memo, useEffect, useState } from "react";
import { MessageSquare, Menu, X, History, SunMoon, LogIn, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HistoryManager } from "@/components/chat/history-manager";
import VoidLogo from "../voidLooks/voidLogo";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const   DarkLightComponent = () => {
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <Button
      onClick={toggleDarkMode}
      variant="ghost"
      size="sm"
      className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
    >
      <SunMoon className="h-4 w-4" />
    </Button>
  );
};

const Navbar = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const router = useRouter();
  const Session:any = useSession();

  console.log("Session Data:", Session);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.classList.add(theme);
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);


  return (
    <>
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-transparent sticky top-0 z-50 shadow-lg relative">
        {/* Gradient border effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="transition-transform hover:scale-110 duration-300">
                <VoidLogo />
              </div>
              <div>
                <Link
                  href={"/"}
                  className="text-2xl font-bold"
                >
                  <span className="gradient-text">VOID.</span>
                  <span className="text-red-600 dark:text-red-500">AI</span>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <DarkLightComponent />
              <Button
                onClick={() => setIsHistoryOpen(true)}
                variant="ghost"
                size="sm"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-105"
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
              {Session?.status !== "authenticated" && (
                <>
                  {" "}
                  <Button
                    onClick={() => {
                      router.push("/auth/login");
                      setIsMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-300"
                  >
                    <LogIn className="h-4 w-4 mr-3" />
                    Login
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-300"
                    onClick={() => {
                      router.push("/auth/signup");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-3" />
                    SignUp
                  </Button>
                </>
                
              )}
              {
                Session?.status === "authenticated" && (
                  <>
                   <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-300"
                    onClick={() => {
                      router.push("/services/chatbots");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Bot className="h-4 w-4" />
                    {"My ChatBots"}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-300"
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-3" />
                    Logout
                  </Button>
                  

                  {/* <img className="w-9 h-9 rounded-full" src={`https://avatar.iran.liara.run/username?username=${Session?.data?.user?.firstName}+${Session?.data?.user?.lastName}`} alt="profile" /> */}
                  </>
                )
              }
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
                {isMobileMenuOpen ? (
                  <X className="h-10 w-10" />
                ) : (
                  <Menu className="h-10 w-10" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 dark:border-slate-700 py-4">
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    setIsHistoryOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start text-slate-600 dark:text-slate-300"
                >
                  <History className="h-4 w-4 mr-3" />
                  History
                </Button>
                {Session?.status !== "authenticated" && (
                  <>
                    {" "}
                    <Button
                      onClick={() => {
                        router.push("/auth/login");
                        setIsMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start text-slate-600 dark:text-slate-300"
                    >
                      <LogIn className="h-4 w-4 mr-3" />
                      Login
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-600 dark:text-slate-300"
                      onClick={() => {
                        router.push("/auth/signup");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogIn className="h-4 w-4 mr-3" />
                      SignUp
                    </Button>
                  </>
                )}
                 {
                Session?.status === "authenticated" && (
                  <>
                      <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-300"
                    onClick={() => {
                      router.push("/services/chatbots");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                  <Bot className="h-4 w-4" />
                    {"My ChatBots"}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-300"
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-3" />
                    Logout
                  </Button>

                 </>
                )
              }
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* History Manager Modal */}
      <HistoryManager
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  );
});

Navbar.displayName = "Navbar";

export { Navbar };
