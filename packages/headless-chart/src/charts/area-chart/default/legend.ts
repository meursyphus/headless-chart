import type { AreaChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian/index";

export function Legend(...args: Parameters<AreaChartCustom["legend"]>) {
  return Cartesian.Legend(args[0]);
}
