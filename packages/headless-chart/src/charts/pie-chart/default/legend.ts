import type { PieChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian/index";

export function Legend(...args: Parameters<PieChartCustom["legend"]>) {
  return Cartesian.Legend(args[0]);
}
