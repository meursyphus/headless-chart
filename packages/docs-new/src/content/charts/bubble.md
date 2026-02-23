---
title: "Bubble Chart"
description: "Scatter points with a third dimension encoded as bubble size"
slug: "bubble"
category: "cartesian"
---

# Bubble Chart

A bubble chart extends the scatter chart by adding a third numeric dimension represented by the size of each point. This makes it possible to compare three variables simultaneously on a single plot.

## Use Cases

- Comparing countries by GDP (x), life expectancy (y), and population (size)
- Analyzing product performance across revenue, profit, and market share
- Visualizing multi-dimensional scientific datasets

## Data Format

```ts
type BubbleChartData = {
  datasets: {
    legend: string;
    data: { x: number; y: number; value: number; label: string }[];
  }[];
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and plot placement |
| Plot | `custom.plot` | The main plotting area containing axes, series, and grid |
| Series | `custom.series` | Container for all bubble points with access to point data and scale |
| Bubble | `custom.bubble` | An individual bubble element |
| X Axis | `custom.xAxis` | The complete X axis with line, labels, and ticks |
| Y Axis | `custom.yAxis` | The complete Y axis with line, labels, and ticks |
| X Axis Label | `custom.xAxisLabel` | Individual label on the X axis |
| Y Axis Label | `custom.yAxisLabel` | Individual label on the Y axis |
| X Axis Tick | `custom.xAxisTick` | Tick mark on the X axis |
| Y Axis Tick | `custom.yAxisTick` | Tick mark on the Y axis |
| X Axis Line | `custom.xAxisLine` | The X axis baseline |
| Y Axis Line | `custom.yAxisLine` | The Y axis baseline |
| Grid | `custom.grid` | Background grid containing X and Y grid lines |
| Grid X Line | `custom.gridXLine` | Vertical grid line |
| Grid Y Line | `custom.gridYLine` | Horizontal grid line |
| Legend | `custom.legend` | Individual legend item |
| Title | `custom.title` | Chart title widget |
| Data Label | `custom.dataLabel` | Label displayed near a bubble |

## Basic Usage

```tsx
import { BubbleChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={BubbleChart({
        data: {
          datasets: [
            {
              legend: "Countries",
              data: [
                { x: 30000, y: 78, value: 330, label: "USA" },
                { x: 45000, y: 82, value: 67, label: "France" },
                { x: 10000, y: 75, value: 1400, label: "China" }
              ]
            }
          ]
        },
        title: "GDP vs Life Expectancy"
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
BubbleChart({
  data: { datasets: [{ legend: "Data", data: [{ x: 1, y: 2, value: 50, label: "B1" }] }] },
  custom: {
    bubble: ({ value, label, legend, index }, config) => {
      // Custom bubble shape, gradient, or animation
    },
    series: ({ points, scale }, config) => {
      // Full control over how all bubbles are positioned
    }
  }
})
```
