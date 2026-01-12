"use client";

import { memo, useState } from "react";
import { Bot, User, Copy, Volume2, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Message } from "@/types/chat";
import { CodeBlock } from "@/components/code-block";
import { ImageDisplay } from "@/components/image-display";
import { useClipboard } from "@/hooks/useClipboard";
import { useSpeech } from "@/hooks/useSpeech";
import VoidLogo from "../voidLooks/voidLogo";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github-dark.css';
import { toast } from "react-toastify";


interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = memo<MessageBubbleProps>(({ message }) => {
  const { copyToClipboard } = useClipboard();
  const { speak } = useSpeech();

  const mdComponents = {
    
    pre({ children }: any) {
    const child = children?.[0];

    if (!child || typeof child !== "object") {
      return (
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          {children}
        </pre>
      );
    }

    const className = child.props?.className || "";
    const langMatch = /language-(\w+)/.exec(className);
    const language = langMatch?.[1];
    const code = child.props?.children || "";

    if (language) {
      return (
        <pre className={`language-${language}`}>
          <code className={`language-${language}`}>
            {String(code)}
          </code>
        </pre>
      );
    }

    return (
      <pre className="bg-slate-100  dark:bg-slate-800 p-4 break-all rounded-lg overflow-x-scroll">
        <code className="break-words">{String(code)}</code>
      </pre>
    );
  },


   
code({ inline, className, children, ...props }: any) {
  const [copied, setCopied] = useState(false);


  const extractText = (children: any): string => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (typeof children === "object" && children?.props?.children)
    return extractText(children.props.children);
  return "";
};


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(extractText(children));
      toast('Code copied to clipboard')
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  if (!inline) {
    return (
      <div className="relative group">
        <code
          className={`${className} px-2 py-1 text-sm whitespace-pre overflow-x-auto rounded-md bg-slate-100 dark:bg-slate-800 font-mono border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium block`}
          {...props}
        >
          {children}
        </code>

        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 opacity-100 group-hover:opacity-100 transition text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
    );
  }

  return (
    <code
      className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-sm border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
      {...props}
    >
      {children}
    </code>
  );
}
,
    // Images
    img({ src, alt, ...props }: any) {
      return (
        <div className="my-2 flex justify-center items-center">
          <ImageDisplay imageUrl={src} prompt={alt || "Generated image"} />
        </div>
      );
    },

    // Better paragraph handling
    p({ children }: any) {
      return (
        <p className="mb-4 last:mb-0 leading-relaxed text-slate-800 dark:text-slate-100">
          {children}
        </p>
      );
    },

    // Better list handling
    ul({ children }: any) {
      return (
        <ul className="mb-4 pl-6 space-y-2 list-disc text-slate-800 dark:text-slate-100">
          {children}
        </ul>
      );
    },

    ol({ children }: any) {
      return (
        <ol className="mb-4 pl-6 space-y-2 list-decimal text-slate-800 dark:text-slate-100">
          {children}
        </ol>
      );
    },

    li({ children }: any) {
      return <li className="text-slate-800 dark:text-slate-100">{children}</li>;
    },

    // Better heading handling
    h1({ children }: any) {
      return (
        <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          {children}
        </h1>
      );
    },

    h2({ children }: any) {
      return (
        <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
          {children}
        </h2>
      );
    },

    h3({ children }: any) {
      return (
        <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
          {children}
        </h3>
      );
    },

    // Better blockquote handling
    blockquote({ children }: any) {
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-slate-50 dark:bg-slate-800/50 italic text-slate-800 dark:text-slate-200">
          {children}
        </blockquote>
      );
    },

    // Better table handling
    table({ children }: any) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border border-slate-200 dark:border-slate-700 rounded-lg">
            {children}
          </table>
        </div>
      );
    },

    thead({ children }: any) {
      return (
        <thead className="bg-slate-50 dark:bg-slate-800">{children}</thead>
      );
    },

    th({ children }: any) {
      return (
        <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700">
          {children}
        </th>
      );
    },

    td({ children }: any) {
      return (
        <td className="px-4 py-2 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
          {children}
        </td>
      );
    },

    // Better link handling
    a({ children, href, ...props }: any) {
      return (
        <a
          href={href}
          className="text-blue-600 break-all dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    },

    // Better strong/bold handling
    strong({ children }: any) {
      return (
        <strong className="font-bold text-slate-900 dark:text-white">
          {children}
        </strong>
      );
    },

    // Better emphasis/italic handling
    em({ children }: any) {
      return (
        <em className="italic text-slate-800 dark:text-slate-200">
          {children}
        </em>
      );
    },
  };

  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 w-[100vw] sm:w-full md:gap-4 group ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 hidden md:block">
          <VoidLogo />
        </div>
      )}

      <Card
        className={`max-w-[90%] p-2 sm:max-w-[80%] md:max-w-[75%] transition-all duration-300 hover:shadow-xl ${
          isUser
            ? "bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white border-transparent shadow-glow-purple"
            : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-glow-blue"
        }`}
      >
        <CardContent className="p-4 md:p-5">
          {!isUser ? (
            <div className="prose break-words prose-sm md:prose-base dark:prose-invert max-w-screen">
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                remarkPlugins={[remarkGfm]}
                components={mdComponents}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="whitespace-pre-wrap  text-sm md:text-base leading-relaxed font-medium text-white">
              {Array.isArray(message.content) ? message.content?.map((cont,i) =>{
                return (
                 <div key={i} className="">
                  {cont.type == 'image_url' ? <ImageDisplay imageUrl={cont?.image_url?.url} prompt=""  /> : cont.text}
                 </div>
                )
              }) : message.content}
            </div>
          )}

          {!isUser && (
            <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() =>
                  copyToClipboard(
                    message.content,
                    "Message copied to clipboard"
                  )
                }
              >
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => speak(message.content)}
              >
                <Volume2 className="h-3 w-3 mr-1" /> Listen
              </Button>
            </div>
          )}

          <div
            className={`text-xs mt-2 ${
              isUser ? "text-blue-100" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </CardContent>
      </Card>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg ring-2 ring-purple-500/30">
            <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";

export { MessageBubble };
