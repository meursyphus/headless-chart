import type { Widget } from "@meursyphus/flitter";

type ConfigArgs<T = undefined> = (args: T, context: PieChartConfig) => Widget;

export type PieChartData = {
  datasets: {
    legend: string;
    data: {
      value: number;
      label: string;
      legend: string;
    }[];
  }[];
};

export type PieScale = {
  centerX: number;
  centerY: number;
  radius: number;
};

export type PieChartScale = {
  scale: PieScale;
  maxRadius?: number;
  minRadius?: number;
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
  plot: ConfigArgs<{
    xAxis: Widget;
    yAxis: Widget;
    series: Widget;
    grid: Widget;
  }>;
  legend: ConfigArgs<{ name: string; index: number }>;
  title: ConfigArgs<{ name: string }>;
  dataLabel: ConfigArgs<{
    x: number;
    y: number;
    value: number;
    label: string;
    legend: string;
  }>;
  grid: ConfigArgs<{ xLine: Widget; yLine: Widget }>;
};

export type PieChartConfig = {
  custom: PieChartCustom;
  data: PieChartData;
  scale: PieChartScale;
  title: string;
};
