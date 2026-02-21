import type { FunnelChartCustom } from "../types";
import { Text, TextStyle, type Widget } from "@meursyphus/flitter";

export function DataLabel(
  ...[{ value, percentage }]: Parameters<FunnelChartCustom["dataLabel"]>
): Widget {
  return Text(`${value.toLocaleString()} (${percentage.toFixed(1)}%)`, {
    style: new TextStyle({
      fontSize: 11,
      color: "rgba(255,255,255,0.85)",
    }),
  });
}
