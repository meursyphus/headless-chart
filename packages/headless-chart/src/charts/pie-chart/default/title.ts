import type { PieChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian/index";

export function Title(...args: Parameters<PieChartCustom["title"]>) {
  return Cartesian.Title(args[0]);
}
