---
title: "Stacked Bar Chart"
description: "Bars stacked on top of each other showing part-to-whole relationships within categories"
slug: "stacked-bar"
category: "cartesian"
---

# Stacked Bar Chart

A stacked bar chart places bars for each dataset on top of one another within each category. This reveals both the total value per category and the contribution of each sub-group. It supports both vertical and horizontal orientations.

## Use Cases

- Showing total sales broken down by product type per region
- Displaying time allocation across activities per day
- Comparing composition of expenses across departments

## Data Format

```ts
type StackedBarChartData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and plot placement |
| Plot | `custom.plot` | The main plotting area containing axes, series, and grid |
| Series | `custom.series` | Container for all stacked bar groups |
| Bar Group | `custom.barGroup` | A stacked group of bars sharing the same label |
| Bar | `custom.bar` | Individual bar segment within a stack |
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
| Data Label | `custom.dataLabel` | Label displayed on each bar segment |

## Basic Usage

```tsx
import { StackedBarChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={StackedBarChart({
        data: {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          datasets: [
            { legend: "Product A", values: [30, 40, 35, 50] },
            { legend: "Product B", values: [20, 25, 30, 20] },
            { legend: "Product C", values: [10, 15, 12, 18] }
          ]
        },
        title: "Quarterly Sales by Product",
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
StackedBarChart({
  data: { labels: ["A", "B"], datasets: [{ legend: "X", values: [10, 20] }, { legend: "Y", values: [15, 25] }] },
  direction: "horizontal",
  custom: {
    bar: ({ value, label, legend, index }, config) => {
      // Custom bar segment styling
    },
    barGroup: ({ bars, index, label, values }, config) => {
      // Custom stacked group arrangement
    }
  }
})
```
