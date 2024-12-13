//xAxis, yAxis, series,

import type { AreaChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian/index";

export function Plot(...args: Parameters<AreaChartCustom["plot"]>) {
  return Cartesian.Plot(args[0]);
}
