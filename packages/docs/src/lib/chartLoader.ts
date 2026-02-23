import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const chartComponents: Record<string, ComponentType> = {
  "bar-chart": dynamic(() => import("@/components/charts/ToastBarChart"), {
    ssr: false,
  }),
  "line-chart": dynamic(() => import("@/components/charts/ToastLineChart"), {
    ssr: false,
  }),
  "area-chart": dynamic(() => import("@/components/charts/ToastAreaChart"), {
    ssr: false,
  }),
  "pie-chart": dynamic(() => import("@/components/charts/ToastPieChart"), {
    ssr: false,
  }),
  "scatter-chart": dynamic(
    () => import("@/components/charts/ToastScatterChart"),
    { ssr: false }
  ),
  "bubble-chart": dynamic(
    () => import("@/components/charts/ToastBubbleChart"),
    { ssr: false }
  ),
  "radar-chart": dynamic(
    () => import("@/components/charts/ToastRadarChart"),
    { ssr: false }
  ),
  "heatmap-chart": dynamic(
    () => import("@/components/charts/ToastHeatmapChart"),
    { ssr: false }
  ),
  "treemap-chart": dynamic(
    () => import("@/components/charts/ToastTreemapChart"),
    { ssr: false }
  ),
  "candlestick-chart": dynamic(
    () => import("@/components/charts/ToastCandlestickChart"),
    { ssr: false }
  ),
  "gauge-chart": dynamic(
    () => import("@/components/charts/ToastGaugeChart"),
    { ssr: false }
  ),
  "funnel-chart": dynamic(
    () => import("@/components/charts/ToastFunnelChart"),
    { ssr: false }
  ),
  "sankey-chart": dynamic(
    () => import("@/components/charts/ToastSankeyChart"),
    { ssr: false }
  ),
  "sunburst-chart": dynamic(
    () => import("@/components/charts/ToastSunburstChart"),
    { ssr: false }
  ),
  "box-plot-chart": dynamic(
    () => import("@/components/charts/ToastBoxPlotChart"),
    { ssr: false }
  ),
  "waterfall-chart": dynamic(
    () => import("@/components/charts/ToastWaterfallChart"),
    { ssr: false }
  ),
  "stacked-bar-chart": dynamic(
    () => import("@/components/charts/ToastStackedBarChart"),
    { ssr: false }
  ),
  "stacked-area-chart": dynamic(
    () => import("@/components/charts/ToastStackedAreaChart"),
    { ssr: false }
  ),
};

export function getChartComponent(slug: string): ComponentType | null {
  return chartComponents[slug] || null;
}

export function getContentSlug(slug: string): string {
  return slug.replace(/-chart$/, "");
}
