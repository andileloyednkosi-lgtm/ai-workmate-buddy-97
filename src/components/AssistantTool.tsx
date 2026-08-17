import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { runAssistant } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Tool = "email" | "notes" | "planner";

interface AssistantToolProps {
  tool: Tool;
  label: string;
  description: string;
  placeholder: string;
  examples: string[];
  tones?: string[];
}

export function AssistantTool({
  tool,
  label,
  description,
  placeholder,
  examples,
  tones,
}: AssistantToolProps) {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState(tones?.[0] ?? "");
  const call = useServerFn(runAssistant);

  const mutation = useMutation({
    mutationFn: async () =>
      call({ data: { tool, prompt, ...(tones ? { tone } : {}) } }),
    onError: (error: Error) => toast.error(error.message || "Something went wrong"),
  });

  const output = mutation.data?.text ?? "";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h3 className="text-lg font-semibold">{label}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>

        <div className="mt-5 space-y-4">
          {tones ? (
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor={`${tool}-input`}>Your input</Label>
            <Textarea
              id={`${tool}-input`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={placeholder}
              className="min-h-44 resize-y bg-background/60"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setPrompt(ex)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {ex.length > 46 ? `${ex.slice(0, 46)}…` : ex}
              </button>
            ))}
          </div>

          <Button
            className="w-full"
            disabled={!prompt.trim() || mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="animate-spin" /> Working…
              </>
            ) : (
              <>
                <Sparkles /> Generate
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">Result</h3>
          {output ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                void navigator.clipboard.writeText(output);
                toast.success("Copied to clipboard");
              }}
            >
              <Copy /> Copy
            </Button>
          ) : null}
        </div>
        <div className="mt-4 flex-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
          {mutation.isPending ? (
            <p className="text-muted-foreground">Thinking through your request…</p>
          ) : output ? (
            output
          ) : (
            <p className="text-muted-foreground">
              Your AI-generated output will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
