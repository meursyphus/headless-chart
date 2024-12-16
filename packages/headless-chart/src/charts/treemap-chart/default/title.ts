import type { TreeMapChartCustom } from "../type";
import * as Cartesian from "@shared/cartesian/index";

export function Title(...args: Parameters<TreeMapChartCustom["title"]>) {
  return Cartesian.Title(args[0]);
}
