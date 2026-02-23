---
title: "Pie Chart"
description: "Circular chart divided into proportional slices representing parts of a whole"
slug: "pie"
category: "radial"
---

# Pie Chart

A pie chart divides a circle into slices where each slice's arc length is proportional to the value it represents. It is best used when you want to show the composition of a whole. Set `innerRadius` to create a donut chart variant.

## Use Cases

- Showing market share distribution among competitors
- Displaying budget allocation across departments
- Visualizing survey response proportions

## Data Format

```ts
type PieChartData = {
  labels: string[];
  values: number[];
  title?: string;
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, pie, and legends placement |
| Pie | `custom.pie` | The pie container holding all slices and data labels |
| Slice | `custom.slice` | An individual pie slice with angle and percentage info |
| Legend | `custom.legend` | Individual legend item |
| Title | `custom.title` | Chart title widget |
| Data Label | `custom.dataLabel` | Label showing value or percentage for each slice |

## Basic Usage

```tsx
import { PieChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={PieChart({
        data: {
          labels: ["Chrome", "Safari", "Firefox", "Edge"],
          values: [65, 18, 10, 7]
        },
        title: "Browser Market Share",
        innerRadius: 0
      })}
      width={400}
      height={400}
      renderer="svg"
    />
  );
}
```

## Customization Example

```tsx
PieChart({
  data: { labels: ["A", "B", "C"], values: [40, 35, 25] },
  innerRadius: 0.5, // Donut chart
  colors: ["#ff6384", "#36a2eb", "#ffce56"],
  custom: {
    slice: ({ index, label, value, percentage, startAngle, sweepAngle }, config) => {
      // Custom slice with gradient or animation
    },
    dataLabel: ({ label, value, percentage, index }, config) => {
      // Custom label positioning or formatting
    }
  }
})
```
