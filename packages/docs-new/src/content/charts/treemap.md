---
title: "Treemap Chart"
description: "Nested rectangles representing hierarchical data proportional to their values"
slug: "treemap"
category: "specialized"
---

# Treemap Chart

A treemap chart displays hierarchical data as nested rectangles. Each rectangle's area is proportional to its value, making it effective for showing how a whole is divided into parts. The squarify algorithm ensures rectangles have balanced aspect ratios for readability.

## Use Cases

- Visualizing disk space usage by folder and file
- Showing portfolio allocation by sector and holding
- Displaying organizational budgets by department

## Data Format

```ts
type TreemapNode = {
  label: string;
  value: number;
  color?: string;
};

type TreemapData = {
  nodes: TreemapNode[];
  title?: string;
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legend, and treemap |
| Title | `custom.title` | Chart title widget |
| Legend | `custom.legend` | Legend container with individual items |
| Legend Item | `custom.legendItem` | Individual legend entry with label and color |
| Treemap | `custom.treemap` | The treemap container holding all node rectangles |
| Node | `custom.node` | An individual rectangle with label, value, color, position, and dimensions |

## Basic Usage

```tsx
import { TreemapChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={TreemapChart({
        data: {
          nodes: [
            { label: "Technology", value: 45 },
            { label: "Healthcare", value: 25 },
            { label: "Finance", value: 20 },
            { label: "Energy", value: 10 }
          ]
        },
        title: "Sector Allocation"
      })}
      width={600}
      height={400}
      renderer="svg"
    />
  );
}
```

## Customization Example

```tsx
TreemapChart({
  data: { nodes: [{ label: "A", value: 50 }, { label: "B", value: 30 }] },
  colors: ["#3b82f6", "#ef4444", "#22c55e"],
  custom: {
    node: ({ label, value, color, index, ratio, x, y, width, height }, config) => {
      // Custom rectangle with rounded corners, labels, or tooltips
    },
    legendItem: ({ label, color, index }, config) => {
      // Custom legend swatch
    }
  }
})
```
