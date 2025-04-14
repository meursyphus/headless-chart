import { Container, Stack, type Widget } from "@meursyphus/flitter";
import type { PieChartConfig } from "../types";

export const Series = (
  { slices }: { slices: Widget[] },
  _: PieChartConfig
): Widget => {
  return Container({
    width: 250,
    height: 250,
    child: Stack({
      children: slices,
    }),
  });
};
