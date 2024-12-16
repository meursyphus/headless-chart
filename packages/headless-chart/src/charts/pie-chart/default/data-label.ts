import type { PieChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian/index";

export function DataLabel(...args: Parameters<PieChartCustom["dataLabel"]>) {
  return Cartesian.DataLabel(args[0]);
}
