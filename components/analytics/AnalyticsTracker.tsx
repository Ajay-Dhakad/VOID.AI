"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export function AnalyticsTracker() {
  const { data: session } = useSession();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (session?.user && !hasTracked.current) {
      const trackAnalytics = async () => {
        try {
          const chatHistory = localStorage.getItem("ai-chat-history");
          const parsedHistory = chatHistory ? JSON.parse(chatHistory) : [];

          await fetch("/api/analytics/save", {
            method: "POST",
            body: JSON.stringify({ chatHistory: parsedHistory }),
          });
          hasTracked.current = true;
        } catch (error) {
          console.error("Failed to track analytics:", error);
        }
      };

      trackAnalytics();
    }
  }, [session]);

  return null;
}
