---
title: "Radar Chart"
description: "Multi-axis radial chart for comparing multiple quantitative variables"
slug: "radar"
category: "radial"
---

# Radar Chart

A radar chart (also known as a spider or web chart) displays multivariate data on axes radiating from a center point. Each variable has its own axis, and data points are connected to form a polygon, making it easy to compare profiles across multiple dimensions.

## Use Cases

- Comparing player stats across multiple skills in sports analytics
- Evaluating product features against competitors
- Assessing employee competencies across different areas

## Data Format

```ts
type RadarChartData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
  title?: string;
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and radar placement |
| Radar | `custom.radar` | The radar container holding grid, axes, datasets, and axis labels |
| Grid | `custom.grid` | Concentric grid levels forming the background web |
| Axis | `custom.axis` | An individual axis line radiating from center |
| Axis Label | `custom.axisLabel` | Label at the end of each axis |
| Dataset | `custom.dataset` | A polygon representing one dataset's values |
| Legend | `custom.legend` | Individual legend item |
| Title | `custom.title` | Chart title widget |

## Basic Usage

```tsx
import { RadarChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={RadarChart({
        data: {
          labels: ["Speed", "Power", "Defense", "Stamina", "Technique"],
          datasets: [
            { legend: "Player A", values: [85, 70, 90, 60, 75] },
            { legend: "Player B", values: [70, 85, 60, 80, 90] }
          ]
        },
        title: "Player Comparison"
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
RadarChart({
  data: { labels: ["A", "B", "C", "D"], datasets: [{ legend: "Score", values: [80, 60, 90, 70] }] },
  custom: {
    dataset: ({ values, legend, index }, config) => {
      // Custom polygon fill, stroke, or animation
    },
    grid: ({ levels }, config) => {
      // Custom concentric grid styling
    }
  }
})
```
