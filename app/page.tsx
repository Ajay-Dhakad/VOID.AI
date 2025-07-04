"use client";

import { memo, useRef, useEffect } from "react";
import { Bot, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/chat/message-bubble";
import { QuickPrompts } from "@/components/chat/quick-prompts";
import { ChatInput } from "@/components/chat/chat-input";
import { LoadingDots } from "@/components/ui/loading-dots";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { Navbar } from "@/components/layout/navbar";
import VoidLogo from "@/components/voidLooks/voidLogo";
import { toast } from "react-toastify";
const AIChat = memo(() => {
  const { messages, isLoading, sendMessage, clearMessages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change or loading state changes
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  // Also scroll when component mounts with existing messages
  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-[110px] sm:pb-[150px] dark:bg-slate-900">
      {/* Subtle background pattern */}
      {/* <FloatingParticles /> */}

      <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto">
        {/* Navbar */}
        <Navbar />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollRef}>
            <div className="space-y-6 md:space-y-8">
              {messages.length === 0 ? (
                <QuickPrompts onPromptSelect={sendMessage} />
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Conversation
                    </h2>
                    {messages.length > 0 && (
                      <Button
                        onClick={clearMessages}
                        variant="ghost"
                        size="sm"
                        className="text-slate-500 pr-10 sm:pr-0 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear History
                      </Button>
                    )}
                  </div>
                  {messages?.map((message, i) => {
                    const isLast = i === messages.length - 1;
                    return (
                      <div key={i} ref={isLast ? messagesEndRef : null}>
                        <MessageBubble message={message} />
                      </div>
                    );
                  })}
                </>
              )}

              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <VoidLogo />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <LoadingDots size="md" />
                      <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                        Void is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Invisible element to scroll to */}
                {isLoading && <div ref={messagesEndRef}></div>}

              {/* {messages.length > 0 && <div ref={messagesEndRef} className="h-1" />} */}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
});

AIChat.displayName = "AIChat";

export default function Page() {
  return <AIChat />;
}
