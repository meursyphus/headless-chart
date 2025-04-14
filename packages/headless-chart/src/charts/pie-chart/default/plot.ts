import { Center, Container, type Widget } from "@meursyphus/flitter";
import type { PieChartConfig } from "../types";

export const Plot = (
  { series }: { series: Widget },
  _: PieChartConfig
): Widget => {
  return Container({
    child: Center({
      child: series,
    }),
  });
};
