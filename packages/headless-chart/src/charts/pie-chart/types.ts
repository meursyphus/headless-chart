import type { Widget } from "@meursyphus/flitter";

type ConfigArgs<T = undefined> = (args: T, context: PieChartConfig) => Widget;

export type PieChartData = {
  pie: {
    legend: string;
    value: number;
    label: string;
  }[];
};

export type PieChartScale = {
  centerX: number;
  centerY: number;
  radius: number;
};

export type PieChartCustom = {
  series: ConfigArgs<{
    pie: {
      value: number;
      label: string;
      legend: string;
      index: number;
    }[];
    scale: PieChartScale;
  }>;
  pie: ConfigArgs<{
    startAngle: number;
    endAngle: number;
    centerX: number;
    centerY: number;
    radius: number;
    color: string;
    value: number;
    legend: string;
    index: number;
  }>;
  layout: ConfigArgs<{ title: Widget; legends: Widget[]; plot: Widget }>;
  plot: ConfigArgs<{ series: Widget; grid: Widget }>;
  legend: ConfigArgs<{ name: string; index: number }>;
  title: ConfigArgs<{ name: string }>;
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
