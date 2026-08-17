import { createFileRoute } from "@tanstack/react-router";
import { Mail, NotebookPen, ListChecks, Zap } from "lucide-react";

import { AssistantTool } from "@/components/AssistantTool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate workplace tasks with AI: generate emails, summarize meeting notes, and build prioritized task plans in seconds.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Generate professional emails, summarize meetings, and plan tasks with AI built for busy professionals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Mail, title: "Smart Email Generator", text: "Ready-to-send emails in any tone." },
  { icon: NotebookPen, title: "Meeting Notes Summarizer", text: "Decisions and action items, extracted." },
  { icon: ListChecks, title: "AI Task Planner", text: "Prioritized plans with time estimates." },
];

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <section className="bg-hero">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground">
            <Zap className="size-3.5 text-primary" />
            Powered by Lovable AI
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            AI Workplace <span className="text-gradient">Productivity Assistant</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Automate the busywork of your day. Draft emails, distill meetings, and turn
            goals into actionable plans — in seconds.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur"
              >
                <f.icon className="size-5 text-primary" />
                <h2 className="mt-3 text-sm font-semibold">{f.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workspace" className="mx-auto w-full max-w-6xl px-5 pb-24">
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-1 gap-1 sm:grid-cols-3">
            <TabsTrigger value="email">Email Generator</TabsTrigger>
            <TabsTrigger value="notes">Notes Summarizer</TabsTrigger>
            <TabsTrigger value="planner">Task Planner</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="mt-6">
            <AssistantTool
              tool="email"
              label="Smart Email Generator"
              description="Describe the message you need and get a polished, ready-to-send email."
              placeholder="e.g. Ask the design team for final mockups by Thursday, mention the client review on Friday."
              tones={["Professional", "Friendly", "Direct", "Persuasive", "Apologetic"]}
              examples={[
                "Follow up with a client who hasn't replied in two weeks",
                "Decline a meeting invite politely and propose async updates",
              ]}
            />
          </TabsContent>

          <TabsContent value="notes" className="mt-6">
            <AssistantTool
              tool="notes"
              label="Meeting Notes Summarizer"
              description="Paste raw notes or a transcript to get a summary, decisions, and action items."
              placeholder="Paste your meeting notes or transcript here…"
              examples={[
                "Standup: API latency spike, Sam to profile queries, launch moved to the 20th, marketing needs copy by Friday.",
              ]}
            />
          </TabsContent>

          <TabsContent value="planner" className="mt-6">
            <AssistantTool
              tool="planner"
              label="AI Task Planner"
              description="Turn a goal or messy to-do list into a prioritized, time-boxed plan."
              placeholder="e.g. Launch our Q3 onboarding revamp in three weeks with a team of two."
              examples={[
                "Prepare a quarterly board deck while shipping two client projects",
              ]}
            />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
