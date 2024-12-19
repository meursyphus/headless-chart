import type { Widget } from "@meursyphus/flitter";

type ConfigArgs<T = undefined> = (args: T, context: PieChartConfig) => Widget;

export type PieChartCustom = {
  pieGroup: ConfigArgs<{
    pies: Widget[];
    index: number;
    label: string;
    values: number[];
  }>;
  pie: ConfigArgs<{
    value: number;
    label: string;
    legend: string;
    index: number;
  }>;
  series: ConfigArgs<{ pieGroups: Widget[] }>;
  layout: ConfigArgs<{ title: Widget; legends: Widget[]; plot: Widget }>;
  plot: ConfigArgs<{
    xAxis: Widget;
    yAxis: Widget;
    series: Widget;
    grid: Widget;
  }>;
  legend: ConfigArgs<{ name: string; index: number }>;
  title: ConfigArgs<{ name: string }>;
  dataLabel: ConfigArgs<{
    value: number;
    label: string;
    legend: string;
  }>;
};

export type PieChartData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
};

export type PieChartScale = {
  min?: number;
  max?: number;
  step?: number;
  total?: number;
};

export type PieChartConfig = {
  custom: PieChartCustom;
  data: PieChartData;
  scale: PieChartScale;
  title: string;
};
