import type { Widget } from "@meursyphus/flitter";

type ConfigArgs<T = undefined> = (args: T, context: PieChartConfig) => Widget;

export type PieChartData = {};

export type PieScale = {};

export type PieChartScale = {};

export type PieChartCustom = {
  legend: ConfigArgs<{ name: string; index: number }>;
  title: ConfigArgs<{ name: string }>;
  layout: ConfigArgs<{ title: Widget; legends: Widget }>;
  dataLabel: ConfigArgs<{
    x: number;
    y: number;
    value: number;
    label: string;
    legend: string;
  }>;
};

export type PieChartConfig = {
  custom: PieChartCustom;
  data: PieChartData;
  scale: PieChartScale;
  title: string;
};
