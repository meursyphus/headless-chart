---
title: "Waterfall Chart"
description: "Sequential bars showing cumulative effect of positive and negative values"
slug: "waterfall"
category: "cartesian"
---

# Waterfall Chart

A waterfall chart shows how an initial value is affected by a series of positive and negative changes, with floating bars connected by lines. It is the standard way to explain the cumulative effect of sequential values, often used in financial reporting.

## Use Cases

- Explaining profit and loss from revenue to net income
- Showing inventory changes over a period
- Breaking down budget variances from plan to actual

## Data Format

```ts
type WaterfallChartData = {
  labels: string[];
  values: number[];
  totalIndices?: number[]; // Indices that represent cumulative totals rather than changes
  title?: string;
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and plot |
| Plot | `custom.plot` | The main plotting area containing axes, series, and grid |
| Series | `custom.series` | Container for all bars and connectors |
| Bar | `custom.bar` | An individual bar segment with value, cumulative total, and type (increase/decrease/total) |
| Connector | `custom.connector` | Line connecting consecutive bars showing the running total |
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
| Data Label | `custom.dataLabel` | Label showing value and type for each bar |

## Basic Usage

```tsx
import { WaterfallChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={WaterfallChart({
        data: {
          labels: ["Revenue", "COGS", "Gross Profit", "OpEx", "Net Income"],
          values: [500, -200, 0, -150, 0],
          totalIndices: [2, 4]
        },
        title: "Income Statement"
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
WaterfallChart({
  data: { labels: ["Start", "+A", "-B", "End"], values: [100, 50, -30, 0], totalIndices: [0, 3] },
  custom: {
    bar: ({ value, cumulative, index, label, type }, config) => {
      // type is 'increase' | 'decrease' | 'total'
      // Custom bar coloring based on type
    },
    connector: ({ fromCumulative, toCumulative, index }, config) => {
      // Custom connector line style
    }
  }
})
```
