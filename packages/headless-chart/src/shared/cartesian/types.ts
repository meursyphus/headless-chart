import type { Widget } from "@meursyphus/flitter";

type ConfigArgs<T = undefined, OPTION = void> = (
  args: T,
  option: OPTION,
) => Widget;

export type CartesianCustom = {
  xAxis: ConfigArgs<
    { line: Widget; labels: Widget[]; tick: Widget },
    { type: "value" | "label" }
  >;
  yAxis: ConfigArgs<
    { line: Widget; labels: Widget[]; tick: Widget },
    { type: "value" | "label" }
  >;
  xAxisLabel: ConfigArgs<{ name: string; index: number }>;
  yAxisLabel: ConfigArgs<{ name: string; index: number }>;
  xAxisTick: ConfigArgs;
  yAxisTick: ConfigArgs;
  layout: ConfigArgs<{ title: Widget; legends: Widget[]; plot: Widget }>;
  plot: ConfigArgs<{ xAxis: Widget; yAxis: Widget; series: Widget, grid: Widget }>;
  legend: ConfigArgs<{ name: string; index: number }>;
  title: ConfigArgs<{ name: string }>;
  dataLabel: ConfigArgs<{ value: number; label: string; legend: string }>;
  xAxisLine: ConfigArgs;
  yAxisLine: ConfigArgs;
  grid: ConfigArgs<{ x: number; y: number; xLine: Widget; yLine: Widget }>;
  gridXLine: ConfigArgs;
  gridYLine: ConfigArgs;
};

export type CartesianData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
};

export type CartesianScale = {
  min: number;
  max: number;
  step: number;
};
