---
title: "Heatmap Chart"
description: "Color-coded matrix cells representing intensity of values across two axes"
slug: "heatmap"
category: "cartesian"
---

# Heatmap Chart

A heatmap chart uses color intensity to represent values in a two-dimensional matrix. Each cell corresponds to the intersection of an X-axis label and a Y-axis label, making it excellent for spotting patterns and hotspots in dense datasets.

## Use Cases

- Visualizing website traffic by day of week and hour of day
- Displaying correlation matrices in data analysis
- Showing geographic density or activity patterns

## Data Format

```ts
type HeatmapData = {
  xLabels: string[];
  yLabels: string[];
  values: number[][]; // 2D array [yIndex][xIndex]
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title and plot |
| Plot | `custom.plot` | The main plotting area containing axes and heatmap grid |
| Heatmap | `custom.heatmap` | The grid of heatmap segments |
| Segment | `custom.segment` | An individual cell in the heatmap |
| X Axis | `custom.xAxis` | The complete X axis with line, labels, and ticks |
| Y Axis | `custom.yAxis` | The complete Y axis with line, labels, and ticks |
| X Axis Label | `custom.xAxisLabel` | Individual label on the X axis |
| Y Axis Label | `custom.yAxisLabel` | Individual label on the Y axis |
| X Axis Tick | `custom.xAxisTick` | Tick mark on the X axis |
| Y Axis Tick | `custom.yAxisTick` | Tick mark on the Y axis |
| X Axis Line | `custom.xAxisLine` | The X axis baseline |
| Y Axis Line | `custom.yAxisLine` | The Y axis baseline |
| Title | `custom.title` | Chart title widget |

## Basic Usage

```tsx
import { HeatmapChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={HeatmapChart({
        data: {
          xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          yLabels: ["Morning", "Afternoon", "Evening"],
          values: [
            [5, 10, 15, 8, 3],
            [12, 20, 18, 25, 14],
            [8, 6, 10, 12, 7]
          ]
        },
        title: "Activity Heatmap"
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
HeatmapChart({
  data: { xLabels: ["A", "B"], yLabels: ["X", "Y"], values: [[1, 2], [3, 4]] },
  custom: {
    segment: ({ value, xIndex, yIndex }, config) => {
      // Custom color scale or cell content
    },
    layout: ({ title, plot }, config) => {
      // Custom layout arrangement
    }
  }
})
```
