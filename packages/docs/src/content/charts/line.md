---
title: "Line Chart"
description: "Connected data points showing trends over continuous intervals"
slug: "line"
category: "cartesian"
---

# Line Chart

A line chart connects individual data points with lines to reveal trends and patterns over a continuous axis. It is well suited for time-series data and comparing multiple datasets on the same scale.

## Use Cases

- Tracking stock prices or financial metrics over time
- Monitoring application performance or server metrics
- Comparing growth trends across multiple product lines

## Data Format

```ts
type LineChartData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and plot placement |
| Plot | `custom.plot` | The main plotting area containing axes, series, and grid |
| Series | `custom.series` | Container for all line elements |
| Line | `custom.line` | An individual line connecting data points for one dataset |
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
import { LineChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={LineChart({
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            { legend: "Users", values: [120, 200, 150, 300, 280] }
          ]
        },
        title: "Daily Active Users"
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
LineChart({
  data: { labels: ["Q1", "Q2", "Q3", "Q4"], datasets: [{ legend: "Growth", values: [10, 25, 18, 40] }] },
  custom: {
    line: ({ values, legend, index }, config) => {
      // Return a custom Flitter widget for the line path
    },
    dataLabel: ({ value, label, legend }, config) => {
      // Custom data point label
    }
  }
})
```
