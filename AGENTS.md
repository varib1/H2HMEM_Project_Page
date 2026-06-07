# H2HMem Project Page

## Project Overview

This is the project page for the **H2HMem** paper: "A Multimodal Memory Benchmark for Agents in Human–Human Interactions". The page presents the benchmark's key contributions, dataset construction pipeline, task taxonomy, and experimental results through a clean, light-themed academic landing page.

## Version Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS 4
- **Font**: Inter (via Google Fonts .cn domain)

## Directory Structure

```
├── public/
│   └── figures/            # Paper figure images (converted from PDF)
│       ├── comparison_p0.png  # Figure 1: Human-Human vs Human-Assistant
│       ├── pipeline_p0.png    # Figure 2: Dataset construction pipeline
│       ├── q_p0.png           # Figure 3: Task taxonomy & QA distribution
│       └── case_study_p0.png  # Figure 4: Case studies
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles, light theme, animations
│   │   ├── layout.tsx      # Root layout with Inter font
│   │   └── page.tsx        # Main page with all sections
│   ├── components/ui/      # Shadcn UI component library
│   └── lib/utils.ts        # Utility functions
├── DESIGN.md               # Design specification
└── AGENTS.md               # This file
```

## Key Commands

- `pnpm dev` — Start development server (port 5000)
- `pnpm build` — Production build
- `pnpm ts-check` — TypeScript type checking
- `pnpm lint` — ESLint checking

## Design System

- **Theme**: Light-first (off-white background `#f8f9fc`, white cards)
- **Accent Colors**: Indigo (primary), Cyan (multimodal), Green (recall), Amber (reasoning), Red (application)
- **Cards**: White background with subtle border and shadow, hover shadow increase
- **Animations**: IntersectionObserver-based fade-up, count-up for statistics
- **Typography**: Inter font, bold headings, slate body text
- **Figures**: Paper figures converted from PDF, displayed with figure captions

## Page Sections

1. **Hero** — Title, subtitle, ACL badge, CTA buttons, Comparison figure (Figure 1)
2. **Abstract** — Paper abstract with highlighted keywords
3. **Introduction** — Three fundamental challenges (multimodal, discourse, multi-participant) + gap analysis
4. **Related Work** — Three research areas + benchmark comparison table (Table 1)
5. **Contributions** — Three key contributions in numbered card layout
6. **H2HMem Benchmark** — Dataset stats (count-up), Pipeline figure (Figure 2), 5-stage pipeline detail, online conversational setting, interaction types
7. **Task Taxonomy** — Task taxonomy figure (Figure 3), three categories (Recall/Reasoning/Application), nine task types
8. **Experiments** — Setup, four key findings, dyadic vs multi-party impact, LLM-as-Judge performance chart, error archetype distribution, efficiency trade-offs table, Case Study figure (Figure 4)
9. **Conclusion** — Summary with highlighted takeaways + limitations
10. **Footer** — Navigation links

## Development Notes

- The page is fully client-side rendered (`'use client'`) for animations
- No external API calls — all data is static from the paper
- Paper figures are converted from PDF to PNG using PyMuPDF (fitz)
- Responsive design with mobile-first approach
- Performance: CSS-based animations, no heavy JS libraries
- Images use Next.js Image component with explicit width/height for proper aspect ratio
