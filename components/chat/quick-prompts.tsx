"use client";

import { memo } from "react";
import {
  Code2,
  ImageIcon,
  Brain,
  Zap,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuickPrompt } from "@/types/chat";
import BlurText from "../bitsAnimations/textAnimation";
import { useSession } from "next-auth/react";

interface QuickPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const quickPrompts: QuickPrompt[] = [
  {
    icon: HelpCircle,
    text: "Who are you?",
    prompt: "Who are you ?",
    gradient:
      "bg-gradient-to-br from-violet-600/40 via-purple-600/30 to-fuchsia-600/40 dark:from-violet-500/30 dark:via-purple-500/20 dark:to-fuchsia-500/30 border-violet-400/50 dark:border-violet-500/40",
  },
  {
    icon: Code2,
    text: "I Can Review Code",
    prompt:
      "Review this code and suggest improvements for better performance and readability",
    gradient:
      "bg-gradient-to-br from-blue-600/40 via-cyan-600/30 to-sky-600/40 dark:from-blue-500/30 dark:via-cyan-500/20 dark:to-sky-500/30 border-blue-400/50 dark:border-blue-500/40",
  },
  {
    icon: ImageIcon,
    text: "I Can Generate Image",
    prompt: "Generate image of a professional business meeting in a modern office",
    gradient:
      "bg-gradient-to-br from-purple-600/40 via-pink-600/30 to-rose-600/40 dark:from-purple-500/30 dark:via-pink-500/20 dark:to-rose-500/30 border-purple-400/50 dark:border-purple-500/40",
  },
  {
    icon: Brain,
    text: "I Can Explain Concepts",
    prompt:
      "Explain machine learning concepts in simple terms with practical examples",
    gradient:
      "bg-gradient-to-br from-emerald-600/40 via-teal-600/30 to-cyan-600/40 dark:from-emerald-500/30 dark:via-teal-500/20 dark:to-cyan-500/30 border-emerald-400/50 dark:border-emerald-500/40",
  },
  {
    icon: Zap,
    text: "I Can Optimize Code",
    prompt:
      "Help me optimize this function for better performance and maintainability",
    gradient:
      "bg-gradient-to-br from-amber-600/40 via-orange-600/30 to-yellow-600/40 dark:from-amber-500/30 dark:via-orange-500/20 dark:to-yellow-500/30 border-amber-400/50 dark:border-amber-500/40",
  },
  {
    icon: FileText,
    text: "I Can Write Documentation",
    prompt: "Help me write comprehensive documentation for this API endpoint",
    gradient:
      "bg-gradient-to-br from-indigo-600/40 via-blue-600/30 to-purple-600/40 dark:from-indigo-500/30 dark:via-blue-500/20 dark:to-purple-500/30 border-indigo-400/50 dark:border-indigo-500/40",
  },
];

const QuickPrompts = memo<QuickPromptsProps>(({ onPromptSelect }) => {
    const session:any = useSession()
  
  return (
    <div className="w-full py-12 px-4 md:px-8">
      <BlurText
        text={`${session.data?.user?.firstName || "" } ${session?.status == "authenticated" ? ', ' : ''}Here are some quick prompts to help you get started.`}
        className="text-3xl flex justify-center items-center md:text-4xl font-extrabold text-center text-slate-900 dark:text-white"
        animateBy="words"
        direction="top"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {quickPrompts.map((prompt, i) => (
          <Button
            key={i}
            variant="outline"
            className={`
              h-auto p-6 md:p-8
              ${prompt.gradient}
              backdrop-blur-md
              border-2 rounded-2xl
              hover:shadow-2xl
              hover:scale-105
              hover:-translate-y-2
              transition-all duration-500
              group relative overflow-hidden
              card-premium
            `}
            onClick={() => onPromptSelect(prompt.prompt)}
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
            
            <div className="flex flex-col items-center gap-4 text-center relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-700/70 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 backdrop-blur-sm">
                <prompt.icon className="h-8 w-8 text-slate-800 dark:text-slate-100" />
              </div>

              <div>
                <div className="font-bold text-slate-900 dark:text-white text-base md:text-lg mb-2 tracking-wide">
                  {prompt.text}
                </div>
                <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-500 font-medium transform translate-y-2 group-hover:translate-y-0">
                  Click to get started →
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
});

QuickPrompts.displayName = "QuickPrompts";
export { QuickPrompts };
