"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import GlitchText from "@/components/bitsAnimations/glitchText";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

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
      <head>
        <title>VOID – Your Personal AI Companion</title>
        <meta name="title" content="VOID – Your Personal AI Companion" />
        <meta
          name="description"
          content="VOID is an emotionally intelligent, hyper-smart, and charming AI assistant built to be your dev mentor, friend, and productivity booster — all in one."
        />
        <meta
          name="keywords"
          content="Void Ai,VOID AI,void ai ,AI assistant, VOID, developer AI, productivity AI, AI mentor, full-stack assistant, emotional AI, smart assistant"
        />
        <meta name="author" content="Ajay Dhakad" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="BagJjuoQ5SJ-HGEfrz_jImPCrp5tu5p7kxmBFmt8wYs" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thevoidai.vercel.app/" />
        <meta property="og:title" content="VOID – Your Personal AI Companion" />
        <meta
          property="og:description"
          content="Meet VOID – the smartest AI with humor, heart, and hacker brain. Built for devs, dreamers, and doers."
        />
        <meta property="og:image" content="https://voidcomputing.hu/blog/moving-logo/step6.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://thevoidai.vercel.app/" />
        <meta
          property="twitter:title"
          content="VOID – Your Personal AI Companion"
        />
        <meta
          property="twitter:description"
          content="A next-gen AI experience that's smart, fun, and shockingly helpful. Built by Ajay Dhakad."
        />
        <meta property="twitter:image" content="https://thevoidai.vercel.app/" />

        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="relative">
        <ToastContainer
          draggable
          closeOnClick
          toastClassName={() =>
            "ml-[20%] mt-5 sm:ml-0 text-black dark:text-white bg-transparent backdrop-blur-3xl rounded-lg border px-4 py-2"
          }
          autoClose={2000}
          theme="dark"
          stacked
          limit={1}
          newestOnTop={true}
          position="top-center"
        />

        {showOverlay ? (
          <div className="fixed inset-0 bg-black z-50 animate-fadeOut">
            <div className="flex items-center justify-center h-full">
              <GlitchText
                speed={1.5}
                enableShadows={true}
                enableOnHover={false}
                className="glitch bg-black scale-[2]"
              >
                VOID
              </GlitchText>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
