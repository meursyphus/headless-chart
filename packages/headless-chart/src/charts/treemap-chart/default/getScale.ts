import type { TreeMapChartData, TreeMapChartScale } from "../type";
import * as Cartesian from "@shared/cartesian";

export function getScale({
  datasets,
}: Omit<TreeMapChartData, "labels">): TreeMapChartScale {
  return Cartesian.getScale({
    datasets,
  });
}
