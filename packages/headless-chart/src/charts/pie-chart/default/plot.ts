import type { PieChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian/index";

export function Plot(...args: Parameters<PieChartCustom["plot"]>) {
  return Cartesian.Plot(args[0]);
}
