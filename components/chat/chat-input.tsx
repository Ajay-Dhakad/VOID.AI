"use client";

import type React from "react";

import { memo, useState, useCallback, useEffect } from "react";
import { Send, Loader2, MicOff, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BotModes from "./BotModes";
import { useSpeechInput } from "@/hooks/useSpeachToText";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = memo<ChatInputProps>(({ onSend, isLoading }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = useCallback(() => {
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue);
      setInputValue("");
    }
  }, [inputValue, isLoading, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const { transcript, isListening, toggleListening, resetTranscript } =
    useSpeechInput();

  useEffect(() => {
    if (transcript) {
      setInputValue((prev) => `${prev} ${transcript}`);
      resetTranscript();
    }
  }, [transcript]);

  return (
    <div className="bg-white fixed bottom-0 self-center w-full dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-lg">
      <div className="flex gap-3 max-w-4xl transition-all duration-1000 mx-auto">
        <BotModes />

        <button type="button" onClick={toggleListening}>
          {isListening ? (
            <MicOff className="w-4 h-4 text-red-500 animate-pulse" />
          ) : (
            <Mic className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          )}
        </button>

        <div className="relative flex-1 ">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message or 'generate image of...' to create images"
            disabled={isLoading}
            className="pr-12 h-12 md:h-14 text-sm md:text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isLoading && (
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
            )}
            <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm"></div>
          </div>
        </div>

        <Button
          size="icon"
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
          className="h-12 w-8 sm:w-12 md:h-14 md:w-14 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 shadow-md"
        >
          <Send className="h-2 w-2 md:h-5 md:w-5" />
        </Button>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 text-center font-medium">
        Press{" "}
        <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs font-mono">
          Enter
        </kbd>{" "}
        to send • AI-powered responses • Image generation available
      </p>
    </div>
  );
});

ChatInput.displayName = "ChatInput";

export { ChatInput };
