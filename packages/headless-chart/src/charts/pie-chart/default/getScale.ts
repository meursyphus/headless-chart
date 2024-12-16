import type { PieChartData, PieChartScale } from "../types";
import * as Cartesian from "@shared/cartesian/index";

export function getScale({
  datasets,
}: Omit<PieChartData, "labels">): PieChartScale {
  return Cartesian.getScale({
    datasets,
  });
}
