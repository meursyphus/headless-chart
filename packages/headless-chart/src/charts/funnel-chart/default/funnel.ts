import type { FunnelChartCustom } from "../types";
import { Column, CrossAxisAlignment, type Widget } from "@meursyphus/flitter";

export function Funnel(
  ...[{ stages }]: Parameters<FunnelChartCustom["funnel"]>
): Widget {
  return Column({
    crossAxisAlignment: CrossAxisAlignment.center,
    children: stages,
  });
}
