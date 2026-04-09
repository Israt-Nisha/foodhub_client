"use client";

import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatBubble({ isOpen, onClick }: ChatBubbleProps) {
  return (
    <button
      id="chat-bubble-toggle"
      onClick={onClick}
      className={cn(
        "fixed bottom-8 right-8 w-16 h-16 flex items-center justify-center transition-all duration-700 z-[100] group",
        "shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-primary/40",
        isOpen
          ? "rounded-full bg-primary text-primary-foreground scale-110 rotate-180"
          : "rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground hover:rotate-3"
      )}
      aria-label={isOpen ? "Close Chat" : "Open Chat"}
    >
      {/* Animated Background Layers */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-700 rounded-[inherit]",
        isOpen ? "opacity-100 bg-gradient-to-tr from-primary to-primary/60" : "opacity-0"
      )} />
      
      {/* Glossy & Glassy Effects */}
      <div className="absolute inset-0.5 rounded-[inherit] border border-white/20 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Modern Morphing Icon container */}
        <div className={cn(
          "absolute transition-all duration-700 ease-out transform",
          isOpen ? "scale-100 rotate-0 opacity-100" : "scale-50 rotate-90 opacity-0"
        )}>
          <X size={28} strokeWidth={2.5} className="drop-shadow-sm" />
        </div>
        
        <div className={cn(
          "absolute transition-all duration-700 ease-out transform",
          isOpen ? "scale-50 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )}>
          <MessageCircle size={28} strokeWidth={2.2} className="drop-shadow-sm" />
        </div>

        {!isOpen && (
          <div className="absolute -top-3 -right-3 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-primary border-2 border-white shadow-sm items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            </span>
          </div>
        )}
      </div>

      {/* Floating Aura */}
      <div className={cn(
        "absolute -inset-4 rounded-full transition-all duration-1000 blur-2xl opacity-0 group-hover:opacity-40 -z-10 bg-primary",
        isOpen && "opacity-60 scale-125"
      )} />
    </button>
  );
}
