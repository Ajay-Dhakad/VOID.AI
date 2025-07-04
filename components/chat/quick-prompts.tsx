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

interface QuickPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const quickPrompts: QuickPrompt[] = [
  {
    icon: HelpCircle,
    text: "Who are you?",
    prompt: "Who are you ?",
    gradient:
      "bg-gradient-to-br from-violet-800/30 to-violet-900/20 border-violet-600",
  },
  {
    icon: Code2,
    text: "I Can Review Code",
    prompt:
      "Review this code and suggest improvements for better performance and readability",
    gradient:
      "bg-gradient-to-br from-blue-800/30 to-blue-900/20 border-blue-600",
  },
  {
    icon: ImageIcon,
    text: "I Can Generate Image",
    prompt: "Generate image of a professional business meeting in a modern office",
    gradient:
      "bg-gradient-to-br from-purple-800/30 to-purple-900/20 border-purple-600",
  },
  {
    icon: Brain,
    text: "I Can Explain Concepts",
    prompt:
      "Explain machine learning concepts in simple terms with practical examples",
    gradient:
      "bg-gradient-to-br from-green-800/30 to-green-900/20 border-green-600",
  },
  {
    icon: Zap,
    text: "I Can Optimize Code",
    prompt:
      "Help me optimize this function for better performance and maintainability",
    gradient:
      "bg-gradient-to-br from-yellow-800/30 to-yellow-900/20 border-yellow-600",
  },
  {
    icon: FileText,
    text: "I Can Write Documentation",
    prompt: "Help me write comprehensive documentation for this API endpoint",
    gradient:
      "bg-gradient-to-br from-indigo-800/30 to-indigo-900/20 border-indigo-600",
  },
];

const QuickPrompts = memo<QuickPromptsProps>(({ onPromptSelect }) => {
  return (
    <div className="w-full py-12 px-4 md:px-8">
      <BlurText
        text="Here are some quick prompts to help you get started."
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
              border-2 rounded-xl
              hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]
              hover:scale-[1.03]
              transition-all duration-300
              group relative overflow-hidden
              backdrop-blur-md
            `}
            onClick={() => onPromptSelect(prompt.prompt)}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md group-hover:shadow-blue-500/30 transition-shadow duration-300">
                <prompt.icon className="h-7 w-7 text-slate-800 dark:text-slate-200" />
              </div>

              <div>
                <div className="font-semibold text-slate-900 dark:text-white text-base md:text-lg mb-2 tracking-wide">
                  {prompt.text}
                </div>
                <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  Click to get started
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
