---
title: "Gauge Chart"
description: "Dial-style indicator showing a single value within a defined range"
slug: "gauge"
category: "specialized"
---

# Gauge Chart

A gauge chart displays a single value on a dial with a needle pointing to its position within a minimum-maximum range. Color zones can indicate different thresholds (e.g., danger, warning, safe), making it perfect for dashboard KPIs and status indicators.

## Use Cases

- Showing CPU or memory utilization on a monitoring dashboard
- Displaying customer satisfaction scores
- Indicating speed, temperature, or any bounded metric

## Data Format

```ts
type GaugeChartZone = {
  min: number;
  max: number;
  color: string;
};

type GaugeChartData = {
  value: number;
  min?: number;
  max?: number;
  title?: string;
  zones?: GaugeChartZone[];
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, gauge, and value label |
| Title | `custom.title` | Chart title widget |
| Gauge | `custom.gauge` | The gauge container holding the needle and scale arc |
| Needle | `custom.needle` | The pointer indicating the current value and its ratio within the range |
| Value Label | `custom.valueLabel` | Numeric display showing the current value, min, and max |
| Scale | `custom.scale` | The arc background with color zones |

## Basic Usage

```tsx
import { GaugeChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={GaugeChart({
        data: {
          value: 72,
          min: 0,
          max: 100,
          zones: [
            { min: 0, max: 40, color: "#ef4444" },
            { min: 40, max: 70, color: "#f59e0b" },
            { min: 70, max: 100, color: "#22c55e" }
          ]
        },
        title: "Performance Score"
      })}
      width={400}
      height={300}
      renderer="svg"
    />
  );
}
```

## Customization Example

```tsx
GaugeChart({
  data: { value: 85, min: 0, max: 100 },
  custom: {
    needle: ({ value, ratio }, config) => {
      // Custom needle shape or animation
    },
    valueLabel: ({ value, min, max }, config) => {
      // Custom formatted display
    },
    scale: ({ min, max, zones }, config) => {
      // Custom arc rendering with gradients
    }
  }
})
```
