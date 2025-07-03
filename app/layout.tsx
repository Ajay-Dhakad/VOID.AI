"use client";
import type { Metadata } from "next";
import "./globals.css";
import { useEffect, useState } from "react";
import GlitchText from "@/components/bitsAnimations/glitchText";

// export const metadata: Metadata = {
//   title: 'v0 App',
//   description: 'Created with v0',
//   generator: 'v0.dev',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="relative">
        {showOverlay && (
          <div className="fixed inset-0 bg-black z-50 animate-fadeOut">
            <div className="flex items-center justify-center h-full">
              <GlitchText
                speed={1.5}
                enableShadows={true}
                enableOnHover={false}
                className="glitch bg-black"
                

              >
                VOID
              </GlitchText>
            </div>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
