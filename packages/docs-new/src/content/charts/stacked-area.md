---
title: "Stacked Area Chart"
description: "Layered areas showing cumulative totals and individual contributions over time"
slug: "stacked-area"
category: "cartesian"
---

# Stacked Area Chart

A stacked area chart layers filled areas on top of one another so that the top edge represents the cumulative total. Each layer shows the contribution of an individual series, making it easy to see both the whole and the parts over a continuous axis.

## Use Cases

- Tracking cumulative revenue from multiple product lines over time
- Showing energy production by source (solar, wind, nuclear) over months
- Displaying network traffic broken down by protocol

## Data Format

```ts
type StackedAreaChartData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and plot placement |
| Plot | `custom.plot` | The main plotting area containing axes, series, and grid |
| Series | `custom.series` | Container for all stacked area layers |
| Area | `custom.area` | An individual stacked area layer with cumulative values |
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
| Data Label | `custom.dataLabel` | Label displayed at each data point |

## Basic Usage

```tsx
import { StackedAreaChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={StackedAreaChart({
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            { legend: "Solar", values: [100, 120, 140, 160, 180] },
            { legend: "Wind", values: [80, 90, 100, 110, 120] },
            { legend: "Nuclear", values: [200, 200, 200, 200, 200] }
          ]
        },
        title: "Energy Production by Source"
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
StackedAreaChart({
  data: { labels: ["A", "B", "C"], datasets: [{ legend: "X", values: [10, 20, 15] }] },
  custom: {
    area: ({ values, cumulativeValues, legend, index }, config) => {
      // Custom area fill with gradient or pattern
    },
    plot: ({ xAxis, yAxis, series, grid }, config) => {
      // Rearrange plot internals
    }
  }
})
```
