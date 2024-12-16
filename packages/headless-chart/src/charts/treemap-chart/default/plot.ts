import type { TreeMapChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian";

export function Plot(...args: Parameters<TreeMapChartCustom["plot"]>) {
  return Cartesian.Plot(args[0]);
}
