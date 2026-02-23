---
title: "Sankey Chart"
description: "Flow diagram showing weighted connections between nodes across stages"
slug: "sankey"
category: "specialized"
---

# Sankey Chart

A Sankey chart visualizes flows between nodes where the width of each link is proportional to the flow quantity. Nodes are arranged in columns and links connect sources to targets, making it excellent for understanding how quantities split and merge through a system.

## Use Cases

- Visualizing energy flows from production to consumption
- Mapping user navigation paths through a website
- Showing budget allocation from revenue sources to expenditure categories

## Data Format

```ts
type SankeyChartData = {
  nodes: { id: string; label: string; color?: string }[];
  links: { source: string; target: string; value: number }[];
  title?: string;
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title and Sankey diagram |
| Sankey | `custom.sankey` | The diagram container holding nodes, links, and node labels |
| Node | `custom.node` | An individual node rectangle with id, label, color, and position |
| Link | `custom.link` | A flow path between two nodes with source/target positions and value |
| Node Label | `custom.nodeLabel` | Text label for a node, positioned relative to the node's column |
| Title | `custom.title` | Chart title widget |

## Basic Usage

```tsx
import { SankeyChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={SankeyChart({
        data: {
          nodes: [
            { id: "a", label: "Source A" },
            { id: "b", label: "Source B" },
            { id: "c", label: "Process" },
            { id: "d", label: "Output" }
          ],
          links: [
            { source: "a", target: "c", value: 30 },
            { source: "b", target: "c", value: 20 },
            { source: "c", target: "d", value: 50 }
          ]
        },
        title: "Resource Flow"
      })}
      width={700}
      height={400}
      renderer="svg"
    />
  );
}
```

## Customization Example

```tsx
SankeyChart({
  data: {
    nodes: [{ id: "x", label: "X" }, { id: "y", label: "Y" }],
    links: [{ source: "x", target: "y", value: 100 }]
  },
  custom: {
    node: ({ id, label, color, x, y, width, height }, config) => {
      // Custom node shape or color
    },
    link: ({ source, target, value, sourceX, sourceY, sourceHeight, targetX, targetY, targetHeight, color }, config) => {
      // Custom curved path or gradient link
    },
    nodeLabel: ({ id, label, x, y, width, height, column, totalColumns }, config) => {
      // Custom label positioning based on column
    }
  }
})
```
