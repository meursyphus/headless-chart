# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Root Level (Workspace)
```bash
npm run dev          # Start documentation site development server
npm run build        # Build the headless-chart library
npm run docs:build   # Build documentation site (includes library pre-build)
```

### Headless Chart Library (`packages/headless-chart`)
```bash
npm run dev      # Start Vite development server
npm run build    # TypeScript compile + Vite build
npm run lint     # Run ESLint with TypeScript support
npm run preview  # Preview built library
```

### Documentation Site (`packages/docs`)
```bash
npm run dev      # Start Astro development server
npm run build    # Type check + Astro build  
npm run preview  # Preview production build
```

## Architecture Overview

Headless Chart is a widget-based chart library built on the Flitter framework, providing a "headless" approach where developers get building blocks instead of predefined components.

### Key Architectural Patterns

1. **Widget-Based System**: All charts are composed of nested StatelessWidget classes from Flitter. Each widget implements a `build(context)` method.

2. **Provider Pattern**: Configuration flows through context providers (e.g., `BarChartConfigProvider`). This allows deep customization at any level.

3. **Modular Chart Components**: Each chart is composed of replaceable parts:
   - Layout, Plot, Axes (X/Y), Labels, Ticks, Grid, Legend, Title, Data Labels
   - Default implementations in `default/` folders can be overridden via `custom` prop

4. **Chart Creation Pattern**:
   ```typescript
   BarChart({
     data: { labels, datasets, title },
     custom: { /* override any component */ },
     getScale: /* custom scale function */,
     direction: 'vertical' | 'horizontal'
   })
   ```

5. **Shared Components**: Common Cartesian chart components are in `/shared/cartesian` to avoid duplication across bar, line, area, scatter charts.

### Code Organization

Each chart type follows this structure:
```
packages/headless-chart/src/charts/[chart-type]/
├── index.ts      # Main export using classToFn utility
├── chart.ts      # Core chart widget class
├── provider.ts   # Configuration provider
├── types.ts      # TypeScript type definitions
└── default/      # Default component implementations
```

### Important Technical Details

- **No Traditional Dependencies**: Built from scratch on Flitter, no D3.js or Chart.js
- **Framework Integration**: Primary support for React via `@meursyphus/flitter-react`, secondary for Svelte
- **TypeScript Path Aliases**: Use `@shared/*` and `@utils/*` imports
- **Export Pattern**: Classes are converted to functions via `classToFn` utility for better DX
- **Configuration**: Uses functional configuration approach with `ConfigArgs<T, OPTION>` type

### Development Workflow

1. When modifying charts, ensure changes work in both library and documentation
2. Test changes by running `npm run dev` at root to see live updates in docs
3. Always run `npm run lint` in the library package before committing
4. Chart components should follow the established widget pattern with proper TypeScript types
5. Documentation examples should be interactive using Sandpack when possible

### Git Conventions

**Important**: All commit messages and pull request descriptions must be written in English. This ensures consistency and accessibility for the international development community.