import type { LineChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian/index";

export function Legend(...args: Parameters<LineChartCustom["legend"]>) {
  return Cartesian.Legend(args[0]);
}
