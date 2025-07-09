"use client";

import type React from "react";

import { memo, useState, useCallback, useEffect, useRef } from "react";
import { Send, Loader2, MicOff, Mic, Image, Cross, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BotModes from "./BotModes";
import { useSpeechInput } from "@/hooks/useSpeachToText";
import { toast } from "react-toastify";

interface ChatInputProps {
  onSend: any;
  isLoading: boolean;
}

const ChatInput = memo<ChatInputProps>(({ onSend, isLoading }) => {
  const [inputValue, setInputValue] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");

  console.log(imageUrl, "image");

  const handleSend = useCallback(() => {
    if (inputValue.trim() && !isLoading && !imageUrl) {
      onSend(inputValue);
      setInputValue("");
    }
    if (imageUrl && !isLoading && inputValue) {
      onSend([
        { type: "image_url", image_url: { url: imageUrl } },
        { type: "text", text: inputValue },
      ]);
      setImageUrl("");
      setInputValue("");
    }
  }, [inputValue, imageUrl, isLoading, onSend]);

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

  const handleImageUploadClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setImageUrl("");
      const files = e.target.files;
      if (files && files.length > 0) {
        const id = toast.loading("Uploading image...");
        const file = files[0];

        const formData = new FormData();
        formData.append("image", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (uploadRes.ok) {
          const data = await uploadRes.json();
          const image = data.result;
          setImageUrl(image);
          toast.update(id, {
            render: "Image uploaded successfully",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="bg-transparent transition-all duration-1000 backdrop-blur-lg min-h-[100px] fixed bottom-0 self-center w-full border-t border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-lg">
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
          <div className="absolute transition-all delay-1000 hover:cursor-pointer top-1/2 -translate-y-1/2 left-0 h-full w-12 flex items-center justify-center">
            {imageUrl ? (
              <>
                <X
                  onClick={() => setImageUrl("")}
                  className="absolute top-0 right-0 w-4 h-4 text-red-500"
                />
                <img src={imageUrl} className=" h-full w-full  rounded-sm" alt="" />
              </>
            ) : (
              <Image
                onClick={handleImageUploadClick}
                className="w-5 h-5 text-black dark:text-white"
              />
            )}
            <input
              ref={imageRef}
              onChange={handleImageUpload}
              className="hidden"
              type="file"
              accept="image/png, image/jpeg , image/jpg , image/webp , image/gif , image/heic , image/avif"
              name="photo"
              id=""
            />
          </div>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message or 'generate image of...' to create images"
            disabled={isLoading}
            className="pr-12 pl-12 h-12 md:h-14 text-sm md:text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isLoading && (
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
            )}
            <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm"></div>
          </div>
        </div>

        {/* <Button
          size="icon"
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
          className="h-12 w-8 sm:w-12 md:h-14 md:w-14 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 shadow-md"
        >
          <Send className="h-2 w-2 md:h-5 md:w-5" />
        </Button> */}
      </div>
    </div>
  );
});

ChatInput.displayName = "ChatInput";

export { ChatInput };
