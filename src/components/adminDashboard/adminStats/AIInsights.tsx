"use client";

import { useState } from "react";
import { Brain, Sparkles, AlertTriangle, CheckCircle, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AIInsight {
  title: string;
  description: string;
  recommendation: string;
  type: "success" | "warning" | "info" | "danger";
}

export default function AIInsights({ stats: rawStats }: { stats: any }) {
  const [insights, setInsights] = useState<AIInsight[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Flatten the stats object just like AdminStats.tsx to ensure perfect data access
  let stats = rawStats;
  while (stats && stats.data && typeof stats.data === "object" && !Array.isArray(stats.data)) {
    stats = stats.data;
  }


  // Helper for safe calculations
  const calculatePercentage = (value: any, total: any) => {
    const v = Number(value) || 0;
    const t = Number(total) || 0;
    if (t === 0) return 0;
    return Math.round((v / t) * 100);
  };

  const generateInsights = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats }),
      });
      
      if (!res.ok) throw new Error("Failed to fetch insights");
      
      const data = await res.json();
      setInsights(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 mt-16 border-t pt-12 border-primary/10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Brain className="text-primary w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            AI Business Insights
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Smart platform analysis & growth recommendations</p>
        </div>
        <Button 
          onClick={generateInsights} 
          disabled={loading}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] group relative overflow-hidden h-12 px-8"
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            <Sparkles className="mr-2 group-hover:scale-125 transition-transform duration-300" />
          )}
          {loading ? "Deep Analyzing..." : "Generate Insights"}
        </Button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[220px] rounded-2xl bg-muted/30 animate-pulse border border-border" />
          ))}
        </div>
      )}

      {insights && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {insights.map((insight, idx) => {
            const Icon = insight.type === "success" ? CheckCircle 
                        : insight.type === "warning" ? AlertTriangle 
                        : insight.type === "danger" ? AlertTriangle 
                        : Info;
            return (
              <Card key={idx} className={cn(
                "border-none shadow-2xl bg-background/50 backdrop-blur-sm transition-all hover:scale-[1.02] overflow-hidden group border-2",
                insight.type === "success" ? "border-green-500/20" :
                insight.type === "warning" ? "border-yellow-500/20" :
                insight.type === "danger" ? "border-red-500/20" :
                "border-blue-500/20"
              )}>
                <div className={cn(
                  "h-1.5 w-full",
                  insight.type === "success" ? "bg-green-500" :
                  insight.type === "warning" ? "bg-yellow-500" :
                  insight.type === "danger" ? "bg-red-500" :
                  "bg-blue-500"
                )} />
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      insight.type === "success" ? "bg-green-500/10 text-green-600" :
                      insight.type === "warning" ? "bg-yellow-500/10 text-yellow-600" :
                      insight.type === "danger" ? "bg-red-500/10 text-red-600" :
                      "bg-blue-500/10 text-blue-600"
                    )}>
                      <Icon size={20} />
                    </div>
                    <CardTitle className="text-xl font-bold">{insight.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed italic">"{insight.description}"</p>
                  <div className="p-3 bg-muted/40 rounded-xl border border-border/50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">AI Strategy</span>
                    <p className="text-xs font-semibold text-foreground mt-1.5 leading-normal">{insight.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Dynamic Data Visualization (Simple Bar Chart) */}
      {stats && (
        <Card className="border-primary/10 shadow-lg bg-background/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">User Activity Vitality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Active Users ({Number(stats?.activeUsers) || 0})</span>
                <span>{calculatePercentage(stats?.activeUsers, stats?.totalUsers)}%</span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000" 
                  style={{ width: `${calculatePercentage(stats?.activeUsers, stats?.totalUsers)}%` }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Order Prep Rate</p>
                  <p className="text-lg font-bold text-primary">
                    {calculatePercentage(stats?.preparingOrders, stats?.totalOrders)}%
                  </p>
               </div>
               <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Cancellation Rate</p>
                  <p className="text-lg font-bold text-red-500">
                    {calculatePercentage(stats?.cancelledOrders, stats?.totalOrders)}%
                  </p>
               </div>
               <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Deliver Success</p>
                  <p className="text-lg font-bold text-green-600">
                    {calculatePercentage(stats?.deliveredOrders, stats?.totalOrders)}%
                  </p>
               </div>
               <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Market Reach</p>
                  <p className="text-lg font-bold text-purple-600">{Number(stats?.totalProviderProfiles) || 0} Hubs</p>
               </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
