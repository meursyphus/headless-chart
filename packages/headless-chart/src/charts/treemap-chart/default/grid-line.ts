import { TreeMapChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian";

export function GridXLine(..._: Parameters<TreeMapChartCustom["gridXLine"]>) {
  return Cartesian.GridXLine();
}
export function GridYLine(..._: Parameters<TreeMapChartCustom["gridYLine"]>) {
  return Cartesian.GridYLine();
}
