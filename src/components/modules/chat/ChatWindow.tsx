"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWindow({ isOpen }: { isOpen: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your FoodHub assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      if (data.choices?.[0]?.message) {
        setMessages((prev) => [...prev, data.choices[0].message]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: "assistant", content: "Chat cleared! How can I help you now?" }]);
  };

  return (
    <Card className={cn(
      "fixed bottom-24 right-6 w-[380px] h-[500px] flex flex-col shadow-2xl transition-all duration-500 z-[100] overflow-hidden border-primary/30",
      "bg-background/90 backdrop-blur-xl border-2",
      isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95 pointer-events-none"
    )}>
      <CardHeader className="p-4 bg-primary text-primary-foreground flex flex-row items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-primary-foreground/20 p-1.5 rounded-lg">
            <Bot size={20} />
          </div>
          <CardTitle className="text-lg font-semibold">FoodHub AI</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={clearChat}
          className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          title="Clear chat"
        >
          <Eraser size={16} />
        </Button>
      </CardHeader>

      <CardContent 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20"
      >
        {messages.map((message, i) => (
          <div
            key={i}
            className={cn(
              "flex w-full mb-2",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "flex max-w-[80%] gap-2 items-start",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm",
                message.role === "user" ? "bg-primary/10 text-primary border border-primary/20" : "bg-muted text-muted-foreground border border-border"
              )}>
                {message.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={cn(
                "p-3 rounded-2xl text-sm leading-relaxed shadow-md",
                message.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-none font-medium" 
                  : "bg-card text-card-foreground border border-border rounded-tl-none"
              )}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-2">
            <div className="flex gap-2 items-center bg-muted/50 p-3 rounded-2xl rounded-tl-none border border-border/50">
              <Loader2 size={14} className="animate-spin text-primary" />
              <span className="text-xs text-muted-foreground font-medium">AI is typing...</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 border-t border-border bg-background/50">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-muted/50 border-input focus-visible:ring-2 focus-visible:ring-primary h-10"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 shadow-lg h-10 w-10 transition-transform active:scale-90"
          >
            <Send size={18} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
