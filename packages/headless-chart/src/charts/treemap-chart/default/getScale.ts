import type { TreeMapChartData, TreeMapChartScale } from "../types";
import * as Cartesian from "@shared/cartesian";

export function getScale({
  datasets,
}: Omit<TreeMapChartData, "labels">): TreeMapChartScale {
  return Cartesian.getScale({
    datasets,
  });
}
