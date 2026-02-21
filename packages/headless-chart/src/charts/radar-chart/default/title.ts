import type { RadarChartCustom } from "../types";
import { Text, type Widget } from "@meursyphus/flitter";

export function Title(
  ...[{ name }]: Parameters<RadarChartCustom["title"]>
): Widget {
  return Text(name);
}
