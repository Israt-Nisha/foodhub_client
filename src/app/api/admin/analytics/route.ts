import { env } from "@/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { stats } = await req.json();

    const prompt = `You are a Business Intelligence Expert for FoodHub, a food ordering platform. 
    Analyze these platform statistics and return 3 concise, actionable insights with recommendations.
    
    DATA:
    ${JSON.stringify(stats, null, 2)}
    
    RESPONSE FORMAT:
    You MUST return ONLY a valid JSON array of 3 objects. No other text.
    Example:
    [
      { "title": "Revenue Growth", "description": "Insight description...", "recommendation": "Recommended action...", "type": "success" },
      { "title": "User Engagement", "description": "Insight description...", "recommendation": "Recommended action...", "type": "warning" },
      { "title": "Order Trends", "description": "Insight description...", "recommendation": "Recommended action...", "type": "info" }
    ]
    
    Types can be: "success", "warning", "info", "danger".`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": env.FRONTEND_URL,
        "X-Title": "FoodHub Analytics",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error("OpenRouter error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    // Attempt to parse JSON from content
    try {
      const cleanContent = content.replace(/```json|```/g, "").trim();
      const insights = JSON.parse(cleanContent);
      return NextResponse.json(insights);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Analytics API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
