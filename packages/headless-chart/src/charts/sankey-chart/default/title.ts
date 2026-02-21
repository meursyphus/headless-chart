import type { SankeyChartCustom } from "../types";
import { Text } from "@meursyphus/flitter";

export function Title(
  ...[{ name }]: Parameters<SankeyChartCustom["title"]>
) {
  return Text(name);
}
