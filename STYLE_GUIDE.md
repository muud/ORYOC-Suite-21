# ORYOC Suite 21 — Design System & Style Guide

This document defines the core tokens and components for the ORYOC Suite 21 Next-Generation platform.

## 1. Color Palette

*The application strictly uses Vanilla CSS Variables injected at `:root` within `index.css`.*

### Global Background & Panels
- **\`--bg-color\`**: \`#0b0f19\` (Deep Midnight Blue)
- **\`--panel-bg\`**: \`rgba(25, 30, 41, 0.65)\` (Glassmorphic Dark Wash)
- **\`--panel-border\`**: \`rgba(255, 255, 255, 0.08)\` (Subtle Frosting)

### Accents & Indicators
- **\`--accent-blue\`**: \`#3b82f6\` (Primary Brand, Interactive States)
- **\`--accent-cyan\`**: \`#06b6d4\` (Data Visualization, Highlighting)
- **\`--accent-emerald\`**: \`#10b981\` (Positive Actions, Resolved Alerts)
- **\`--accent-gold\`**: \`#f59e0b\` (Warning States, Neutral Metrics)
- **\`--danger\`**: \`#ef4444\` (Critical Alerts, Errors)

## 2. Typography

*All fonts are served via Google Fonts (Performance optimized).*

- **Headings & Titles (`--font-heading`)**: \`Outfit\`, sans-serif (Weights: 300, 400, 500, 600, 700)
- **Body & Paragraphs (`--font-body`)**: \`Inter\`, sans-serif (Weights: 400, 500, 600)

## 3. UI Components & Tokens

### Glassmorphism
Elements utilizing the glass effect must apply the `.glass-panel` class, which automatically inherits:
\`\`\`css
backdrop-filter: blur(12px);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
\`\`\`

### Micro-Animations
- **Hover Lift (`.hover-float`)**: Apply this class to cards and list items. Elevates the element by 5px and expands the drop-shadow for a 3D focus effect.
- **Pulse Glow (`pulseGlow` keyframes)**: Used for loading states or critical unscheduled alerts.

### 3D Metric Cards
Cards include an artificial 3D metallic volume created by:
- An inner subtle white box shadow `inset 0 2px 4px rgba(255,255,255,0.1)`.
- Reusable React components: import `{ StatCard } from '@/components/ui/StatCard'`.

## 4. The Cloud Motif Background
The signature **"Suite 21 Cloud"** layout incorporates a faint repeating SVG pattern (`.cloud-motif-bg`). This should be isolated within primary analytics widgets (`AnalyticsChart`), ensuring data legibility remains high while preserving the brand's aesthetic.
