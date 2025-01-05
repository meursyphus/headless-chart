import { type Widget } from "@meursyphus/flitter";
import type { PieChartCustom, PieChartData, PieChartScale } from "./types";
import { PieChartConfigProvider } from "./provider";
import * as Default from "./default";
import Chart from "./chart";

export default function PieChart({
  custom = {},
  data,
  title = "",
  getScale = Default.getScale,
}: {
  custom?: Partial<PieChartCustom>;
  title?: string;
  data: PieChartData;
  getScale?: (data: PieChartData) => PieChartScale;
}): Widget {
  const mergedConfig: PieChartCustom = {
    pie: custom.pie ?? Default.Pie,
    series: custom.series ?? Default.Series,
    layout: custom.layout ?? Default.Layout,
    plot: custom.plot ?? Default.Plot,
    legend: custom.legend ?? Default.Legend,
    title: custom.title ?? Default.Title,
    dataLabel: custom.dataLabel ?? Default.DataLabel,
  };

  const scale = getScale(data);

  return PieChartConfigProvider({
    value: {
      custom: mergedConfig,
      data,
      scale,
      title,
    },
    child: new Chart(),
  });
}
