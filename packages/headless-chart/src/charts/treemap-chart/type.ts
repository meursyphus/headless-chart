import type { Widget } from "@meursyphus/flitter";

type ConfigArgs<T = undefined> = (
  args: T,
  context: TreeMapChartConfig,
) => Widget;

export type TreeMapChartCustom = {
  area: ConfigArgs<{ values: number[]; legend: string; index: number }>;
  layout: ConfigArgs<{ title: Widget; legends: Widget[]; plot: Widget }>;
  series: ConfigArgs<{ areas: Widget[] }>;
  plot: ConfigArgs<{
    xAxis: Widget;
    yAxis: Widget;
    series: Widget;
    grid: Widget;
  }>;
  legend: ConfigArgs<{ name: string; index: number }>;
  title: ConfigArgs<{ name: string }>;
  dataLabel: ConfigArgs<{ value: number; label: string; legend: string }>;
  grid: ConfigArgs<{ xLines: Widget[]; yLines: Widget[] }>;
  gridLine: ConfigArgs;
};

export type TreeMapChartData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
};

export type TreeMapChartScale = {
  min: number;
  max: number;
};

export type TreeMapChartConfig = {
  custom: TreeMapChartCustom;
  data: TreeMapChartData;
  scale: TreeMapChartScale;
  title: string;
};
