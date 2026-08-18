# AI Workplace Productivity Assistant

A modern, responsive web application that helps professionals automate everyday workplace tasks with AI. Built with [TanStack Start](https://tanstack.com/start), React, TypeScript, and Tailwind CSS.

## Live Demo

- **Published site:** [https://ai-workmate-buddy-97.lovable.app](https://ai-workmate-buddy-97.lovable.app)

## Features

### 1. Smart Email Generator
Describe the message you need and get a polished, ready-to-send professional email. Choose from tones like Professional, Friendly, Direct, Persuasive, or Apologetic.

### 2. Meeting Notes Summarizer
Paste raw notes or a transcript and receive a structured summary with key decisions and action items — owners and due dates inferred when possible.

### 3. AI Task Planner
Turn a goal or messy to-do list into a prioritized, time-boxed plan with high/medium/low priorities, estimated times, and quick wins.

## Tech Stack

- **Framework:** TanStack Start v1
- **Language:** TypeScript
- **UI:** React 19
- **Styling:** Tailwind CSS v4
- **AI:** Lovable AI Gateway (Google Gemini model)
- **Deployment:** Lovable Cloud

## Project Structure

```text
src/
  components/        # Reusable UI components (AssistantTool, shadcn/ui)
  lib/               # Server functions, utilities, and helpers
  routes/            # TanStack Start file-based routes
  styles.css         # Global CSS and Tailwind theme tokens
  router.tsx         # Router configuration
  start.ts           # Start configuration
public/              # Static assets
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Bun](https://bun.sh/) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install dependencies
bun install
# or
npm install
```

### Environment Variables

Create a `.env` file in the project root with:

```env
LOVABLE_API_KEY=your_lovable_api_key
```

The `LOVABLE_API_KEY` is required for the AI features to work. You can find this in your Lovable project settings.

### Running Locally

```bash
bun run dev
# or
npm run dev
```

The app will be available at `http://localhost:8080`.

### Building for Production

```bash
bun run build
# or
npm run build
```

## AI Configuration

The AI assistant is powered by Lovable AI Gateway. The model is configured in `src/lib/ai.functions.ts`:

```ts
model: "google/gemini-3.6-flash"
```

System prompts are defined for each tool:

- `email`: Workplace communication expert
- `notes`: Meeting notes summarizer
- `planner`: AI task planner

## Key Components

### `AssistantTool`

A reusable two-pane component that handles input, tone selection, example prompts, and AI output display with copy-to-clipboard.

### `src/lib/ai.functions.ts`

A `createServerFn` that securely calls the Lovable AI Gateway from the server side, keeping the API key out of the browser bundle.

## Customization

- Update prompts in `src/lib/ai.functions.ts` to tailor AI behavior.
- Add new tools by extending the `Tool` union type and creating a corresponding `TabsContent` in `src/routes/index.tsx`.
- Adjust themes, colors, and typography in `src/styles.css`.

## Deployment

This project is built to deploy on Lovable Cloud. Use the **Publish** button in the Lovable editor to publish the latest version.

## License

This project is built and owned by you. Modify and ship it as you like.

---

Built with [Lovable](https://lovable.dev).
