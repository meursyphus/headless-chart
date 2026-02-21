import type { FunnelChartCustom } from "../types";
import { Text, type Widget } from "@meursyphus/flitter";

export function Title(
  ...[{ name }]: Parameters<FunnelChartCustom["title"]>
): Widget {
  return Text(name);
}
