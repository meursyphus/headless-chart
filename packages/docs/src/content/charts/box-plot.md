---
title: "Box Plot Chart"
description: "Statistical chart showing data distribution through quartiles and outliers"
slug: "box-plot"
category: "cartesian"
---

# Box Plot Chart

A box plot chart (box-and-whisker plot) displays the distribution of numeric data through five summary statistics: minimum, first quartile (Q1), median, third quartile (Q3), and maximum. Outliers are plotted as individual points beyond the whiskers.

## Use Cases

- Comparing score distributions across different test groups
- Analyzing salary ranges by department or role
- Identifying outliers in manufacturing quality measurements

## Data Format

```ts
type BoxPlotDataPoint = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
};

type BoxPlotChartData = {
  labels: string[];
  datasets: {
    legend: string;
    data: BoxPlotDataPoint[];
  }[];
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and plot |
| Plot | `custom.plot` | The main plotting area containing axes, series, and grid |
| Series | `custom.series` | Container for all box plot groups |
| Box Plot Group | `custom.boxPlotGroup` | A group of box plots sharing the same label |
| Box Plot | `custom.boxPlot` | An individual box plot with all five statistics and legend info |
| Outlier | `custom.outlier` | An individual outlier point |
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

## Basic Usage

```tsx
import { BoxPlotChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={BoxPlotChart({
        data: {
          labels: ["Team A", "Team B", "Team C"],
          datasets: [
            {
              legend: "Scores",
              data: [
                { min: 40, q1: 55, median: 65, q3: 75, max: 90, outliers: [25, 98] },
                { min: 50, q1: 60, median: 70, q3: 80, max: 95 },
                { min: 30, q1: 45, median: 55, q3: 70, max: 85, outliers: [15] }
              ]
            }
          ]
        },
        title: "Score Distribution"
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
BoxPlotChart({
  data: {
    labels: ["Group 1"],
    datasets: [{ legend: "Data", data: [{ min: 10, q1: 20, median: 30, q3: 40, max: 50 }] }]
  },
  custom: {
    boxPlot: ({ dataPoint, index, legend, label }, config) => {
      // dataPoint contains { min, q1, median, q3, max, outliers }
      // Custom box rendering with colors or annotations
    },
    outlier: ({ value, index, legend, label }, config) => {
      // Custom outlier marker shape
    }
  }
})
```
