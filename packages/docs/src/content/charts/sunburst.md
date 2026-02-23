---
title: "Sunburst Chart"
description: "Radial multi-level chart showing hierarchical data as concentric rings"
slug: "sunburst"
category: "radial"
---

# Sunburst Chart

A sunburst chart displays hierarchical data as concentric rings radiating outward from a center point. Each ring represents a level in the hierarchy, and arc lengths are proportional to values. It provides an intuitive way to explore nested categorical data.

## Use Cases

- Exploring file system directory structures
- Visualizing organizational hierarchies with budgets
- Showing taxonomic or classification breakdowns

## Data Format

```ts
type SunburstNode = {
  label: string;
  value?: number;
  color?: string;
  children?: SunburstNode[];
};

type SunburstChartData = {
  root: SunburstNode;
  title?: string;
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, sunburst, and legend |
| Title | `custom.title` | Chart title widget |
| Legend | `custom.legend` | Legend container with individual items |
| Legend Item | `custom.legendItem` | Individual legend entry with label and color |
| Sunburst | `custom.sunburst` | The sunburst container with all computed segments |
| Segment | `custom.segment` | An individual arc segment with depth, angles, and color |

## Basic Usage

```tsx
import { SunburstChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={SunburstChart({
        data: {
          root: {
            label: "Root",
            children: [
              {
                label: "Category A",
                children: [
                  { label: "A1", value: 30 },
                  { label: "A2", value: 20 }
                ]
              },
              {
                label: "Category B",
                children: [
                  { label: "B1", value: 40 },
                  { label: "B2", value: 10 }
                ]
              }
            ]
          }
        },
        title: "Hierarchical Breakdown"
      })}
      width={500}
      height={500}
      renderer="svg"
    />
  );
}
```

## Customization Example

```tsx
SunburstChart({
  data: { root: { label: "Root", children: [{ label: "A", value: 50 }, { label: "B", value: 30 }] } },
  custom: {
    segment: ({ segment }, config) => {
      // segment contains: node, depth, startAngle, endAngle, color
      // Custom arc rendering with hover effects
    },
    legendItem: ({ label, color }, config) => {
      // Custom legend swatch
    }
  }
})
```
