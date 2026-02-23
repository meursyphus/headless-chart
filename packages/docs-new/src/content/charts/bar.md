---
title: "Bar Chart"
description: "Vertical or horizontal bars for comparing categorical data"
slug: "bar"
category: "cartesian"
---

# Bar Chart

A bar chart displays data as rectangular bars with lengths proportional to the values they represent. It is ideal for comparing discrete categories side by side. Headless Chart supports both vertical and horizontal orientations with grouped datasets.

## Use Cases

- Comparing sales figures across product categories
- Showing survey results or poll responses
- Displaying performance metrics across different teams or time periods

## Data Format

```ts
type BarChartData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and plot placement |
| Plot | `custom.plot` | The main plotting area containing axes, series, and grid |
| Series | `custom.series` | Container for all bar groups |
| Bar Group | `custom.barGroup` | A group of bars sharing the same label (category) |
| Bar | `custom.bar` | Individual bar element |
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
| Data Label | `custom.dataLabel` | Label displayed on or near a bar showing its value |

## Basic Usage

```tsx
import { BarChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={BarChart({
        data: {
          labels: ["Jan", "Feb", "Mar"],
          datasets: [
            { legend: "Revenue", values: [120, 200, 150] },
            { legend: "Expenses", values: [90, 140, 110] }
          ]
        },
        title: "Monthly Overview",
        direction: "vertical"
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
BarChart({
  data: { labels: ["A", "B", "C"], datasets: [{ legend: "Sales", values: [10, 20, 30] }] },
  custom: {
    bar: ({ value, label, legend, index }, config) => {
      // Return a custom Flitter widget for each bar
    },
    layout: ({ title, legends, plot }, config) => {
      // Rearrange or restyle the overall layout
    }
  },
  direction: "horizontal"
})
```
