"use client";

import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export function useSpeech() {
  const { toast } = useToast();

  const speak = useCallback(
    (text: string) => {
      try {
        window.speechSynthesis.cancel();
        const cleanText = text
          .replace(/```[\s\S]*?```/g, "code block")
          .replace(/[#*`]/g, "");
        const utterance = new SpeechSynthesisUtterance(cleanText);

        utterance.rate = 1;
        utterance.pitch = 1.2;
        utterance.volume = 1;

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          (v) =>
            v.name.includes("Google UK English Female") ||
            v.name.includes("Google US English") ||
            v.name.toLowerCase().includes("natural") ||
            v.lang === "en-US"
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        window.speechSynthesis.speak(utterance);
        toast({
          title: "🔊 Neural voice synthesis activated",
          duration: 2000,
        });
      } catch (error) {
        toast({
          title: "❌ Speech synthesis failed",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  return { speak };
}
