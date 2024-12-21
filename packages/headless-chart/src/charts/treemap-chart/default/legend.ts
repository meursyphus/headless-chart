import type { TreeMapChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian";

export function Legend(...args: Parameters<TreeMapChartCustom["legend"]>) {
  return Cartesian.Legend(args[0]);
}
