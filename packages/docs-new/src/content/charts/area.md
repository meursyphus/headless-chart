---
title: "Area Chart"
description: "Filled regions under lines emphasizing volume and magnitude"
slug: "area"
category: "cartesian"
---

# Area Chart

An area chart is similar to a line chart but fills the region between the line and the axis, emphasizing the magnitude of values over time. It effectively communicates cumulative totals and the relative weight of different series.

## Use Cases

- Visualizing revenue or traffic volume over time
- Showing resource utilization like memory or CPU usage
- Highlighting the difference between two trends

## Data Format

```ts
type AreaChartData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and plot placement |
| Plot | `custom.plot` | The main plotting area containing axes, series, and grid |
| Series | `custom.series` | Container for all area elements |
| Area | `custom.area` | An individual filled area for one dataset |
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
import { AreaChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={AreaChart({
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr"],
          datasets: [
            { legend: "Downloads", values: [500, 800, 650, 900] }
          ]
        },
        title: "Monthly Downloads"
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
AreaChart({
  data: { labels: ["Q1", "Q2", "Q3"], datasets: [{ legend: "Traffic", values: [1000, 1500, 1200] }] },
  custom: {
    area: ({ values, legend, index }, config) => {
      // Return a custom Flitter widget for the filled area
    },
    legend: ({ name, index }, config) => {
      // Custom legend item
    }
  }
})
```
