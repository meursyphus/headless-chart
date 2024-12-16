import type { TreeMapChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian";

export function DataLabel(
  ...args: Parameters<TreeMapChartCustom["dataLabel"]>
) {
  return Cartesian.DataLabel(args[0]);
}
