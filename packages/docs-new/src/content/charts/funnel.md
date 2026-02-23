---
title: "Funnel Chart"
description: "Progressive narrowing stages showing conversion or drop-off rates"
slug: "funnel"
category: "specialized"
---

# Funnel Chart

A funnel chart visualizes a process with sequential stages that narrow progressively. Each stage shows a value and its proportion relative to the first stage, making it ideal for tracking conversion rates and identifying where drop-offs occur.

## Use Cases

- Tracking sales pipeline from leads to closed deals
- Analyzing e-commerce checkout funnel conversion
- Visualizing recruitment process stages from applications to hires

## Data Format

```ts
type FunnelChartData = {
  stages: { label: string; value: number; color?: string }[];
  title?: string;
};
```

## Customizable Areas

| Area | Prop | Description |
|------|------|-------------|
| Layout | `custom.layout` | Controls the overall chart layout including title, legends, and funnel |
| Funnel | `custom.funnel` | The funnel container holding all stage elements |
| Stage | `custom.stage` | An individual funnel stage with value, ratio, color, and embedded labels |
| Stage Label | `custom.stageLabel` | The name label for a funnel stage |
| Data Label | `custom.dataLabel` | Numeric label showing value and percentage for a stage |
| Legend | `custom.legend` | Individual legend entry with label and color |
| Title | `custom.title` | Chart title widget |

## Basic Usage

```tsx
import { FunnelChart } from "headless-chart";
import { Widget } from "@meursyphus/flitter-react";

function MyChart() {
  return (
    <Widget
      widget={FunnelChart({
        data: {
          stages: [
            { label: "Visitors", value: 10000 },
            { label: "Sign-ups", value: 5000 },
            { label: "Active Users", value: 2500 },
            { label: "Paid Users", value: 1000 }
          ]
        },
        title: "Conversion Funnel"
      })}
      width={500}
      height={400}
      renderer="svg"
    />
  );
}
```

## Customization Example

```tsx
FunnelChart({
  data: { stages: [{ label: "Step 1", value: 100 }, { label: "Step 2", value: 60 }] },
  custom: {
    stage: ({ index, label, value, ratio, color, stageLabel, dataLabel }, config) => {
      // Custom stage shape with trapezoid or rounded styling
    },
    dataLabel: ({ value, percentage, label, index }, config) => {
      // Custom percentage formatting
    }
  }
})
```
