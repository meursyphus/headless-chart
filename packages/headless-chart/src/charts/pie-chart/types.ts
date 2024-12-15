import type { Widget } from "@meursyphus/flitter";

type ConfigArgs<T = undefined> = (args: T, context: PieChartConfig) => Widget;

export type PieChartCustom = {
  segments: ConfigArgs<{
    arcs: {
      value: number;
      legend: string;
      startAngle: number;
      endAngle: number;
    }[];
    total: number;
  }>;
  segment: ConfigArgs<{
    value: number;
    legend: string;
    startAngle: number;
    endAngle: number;
    index: number;
  }>;
  legend: ConfigArgs<{ name: string; index: number }>;
  title: ConfigArgs<{ name: string }>;
  layout: ConfigArgs<{ title: Widget; legends: Widget[]; plot: Widget }>;
  plot: ConfigArgs<{ segments: Widget; grid?: Widget }>;
  grid: ConfigArgs<{ radialLines?: Widget[]; concentricCircles?: Widget[] }>;
  dataLabel: ConfigArgs<{
    value: number;
    label?: string;
    legend: string;
    angle: number;
    radius?: number;
  }>;
};

export type PieChartData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
};

export type PieChartScale = {
  total: number;
};

export type PieChartConfig = {
  custom: PieChartCustom;
  data: PieChartData;
  scale: PieChartScale;
  title: string;
};
