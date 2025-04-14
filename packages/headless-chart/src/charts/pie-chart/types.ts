import type { Widget } from "@meursyphus/flitter";

type ConfigArgs<T = undefined> = (args: T, context: PieChartConfig) => Widget;

export type PieChartCustom = {
  // 레이아웃 관련
  layout: ConfigArgs<{ title: Widget; legends: Widget[]; plot: Widget }>;
  plot: ConfigArgs<{ series: Widget }>;
  
  // 시리즈 관련
  series: ConfigArgs<{ slices: Widget[] }>;
  slice: ConfigArgs<{ 
    value: number; 
    percentage: number;
    label: string; 
    index: number;
  }>;
  
  // 기타 컴포넌트
  legend: ConfigArgs<{ name: string; index: number }>;
  title: ConfigArgs<{ name: string }>;
  sliceLabel: ConfigArgs<{ 
    value: number; 
    percentage: number;
    label: string;
    index: number;
  }>;
};

export type PieChartData = {
  labels: string[];
  datasets: { legend: string; values: number[] }[];
};

export type PieChartConfig = {
  custom: PieChartCustom;
  data: PieChartData;
  title: string;
  isDonut?: boolean;
  innerRadiusRatio?: number;
  startAngle?: number;
};
