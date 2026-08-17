import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  tool: z.enum(["email", "notes", "planner"]),
  prompt: z.string().min(1).max(8000),
  tone: z.string().max(40).optional(),
});

const SYSTEM: Record<string, string> = {
  email:
    "You are an expert workplace communication assistant. Write a complete, ready-to-send professional email based on the user's brief. Output markdown-free plain text with a 'Subject:' line, then the body, then a sign-off. Be concise and specific.",
  notes:
    "You are a meeting notes summarizer. Given raw notes or a transcript, produce: a 3-5 bullet Summary, a Decisions section, and an Action Items section with owners and due dates when inferable. Use clear headings and bullets.",
  planner:
    "You are an AI task planner. Turn the user's goal into a prioritized, realistic plan: a short strategy line, then numbered tasks with priority (High/Medium/Low), estimated time, and suggested day. End with a 'Quick wins' list.",
};

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          {
            role: "system",
            content:
              SYSTEM[data.tool] + (data.tone ? ` Preferred tone: ${data.tone}.` : ""),
          },
          { role: "user", content: data.prompt },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Rate limited — please try again in a moment.");
      if (res.status === 402)
        throw new Error("AI credits exhausted. Add credits in Lovable to continue.");
      throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return { text: json.choices?.[0]?.message?.content ?? "" };
  });
