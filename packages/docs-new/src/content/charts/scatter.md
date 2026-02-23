---
title: "Scatter Chart"
description: "Individual data points plotted on X-Y coordinates to reveal correlations"
slug: "scatter"
category: "cartesian"
---

# Scatter Chart

A scatter chart plots individual data points on a two-dimensional plane using X and Y coordinates. It is the standard choice for exploring relationships, correlations, and distributions between two numeric variables.

## Use Cases

- Analyzing correlation between height and weight
- Identifying clusters or outliers in scientific data
- Comparing price vs. performance across products

## Data Format

```ts
type ScatterChartData = {
  datasets: {
    legend: string;
    data: { x: number; y: number; label: string }[];
  }[];
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and plot placement |
| Plot | `custom.plot` | The main plotting area containing axes, series, and grid |
| Series | `custom.series` | Container for all scatter points with access to point data and scale |
| Scatter | `custom.scatter` | An individual scatter point |
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
| Data Label | `custom.dataLabel` | Label displayed near a scatter point |

## Basic Usage

```tsx
import { ScatterChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={ScatterChart({
        data: {
          datasets: [
            {
              legend: "Group A",
              data: [
                { x: 10, y: 20, label: "A1" },
                { x: 30, y: 50, label: "A2" },
                { x: 50, y: 40, label: "A3" }
              ]
            }
          ]
        },
        title: "Correlation Analysis"
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
ScatterChart({
  data: { datasets: [{ legend: "Points", data: [{ x: 1, y: 2, label: "P1" }] }] },
  custom: {
    scatter: ({ label, legend, index }, config) => {
      // Custom point shape or color
    },
    dataLabel: ({ x, y, value, label, legend }, config) => {
      // Custom tooltip or annotation
    }
  }
})
```
