---
title: "Candlestick Chart"
description: "Financial chart showing open, high, low, and close prices per time period"
slug: "candlestick"
category: "cartesian"
---

# Candlestick Chart

A candlestick chart is the standard visualization for financial price data. Each candlestick represents one time period and encodes four values: open, high, low, and close. The body shows the open-to-close range while the wicks extend to the high and low.

## Use Cases

- Analyzing stock price movements and trends
- Monitoring cryptocurrency trading data
- Reviewing commodity or forex price action

## Data Format

```ts
type CandlestickChartDataPoint = {
  open: number;
  high: number;
  low: number;
  close: number;
};

type CandlestickChartData = {
  labels: string[];
  datasets: CandlestickChartDataPoint[];
  title?: string;
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and plot |
| Plot | `custom.plot` | The main plotting area containing axes, series, and grid |
| Series | `custom.series` | Container for all candlestick elements |
| Candlestick | `custom.candlestick` | An individual candlestick with open, high, low, close, label, and index |
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
| Data Label | `custom.dataLabel` | Label displayed near a candlestick |

## Basic Usage

```tsx
import { CandlestickChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={CandlestickChart({
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            { open: 100, high: 110, low: 95, close: 105 },
            { open: 105, high: 115, low: 100, close: 98 },
            { open: 98, high: 108, low: 92, close: 106 },
            { open: 106, high: 120, low: 104, close: 118 },
            { open: 118, high: 125, low: 112, close: 115 }
          ]
        },
        title: "Weekly Stock Price"
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
CandlestickChart({
  data: { labels: ["Day1"], datasets: [{ open: 10, high: 15, low: 8, close: 12 }] },
  custom: {
    candlestick: ({ open, high, low, close, label, index }, config) => {
      // Custom candlestick with bullish/bearish coloring
    },
    grid: ({ xLine, yLine }, config) => {
      // Custom grid styling
    }
  }
})
```
