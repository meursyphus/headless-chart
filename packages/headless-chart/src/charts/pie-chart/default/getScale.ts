import type { PieChartData, PieChartScale } from "../types";
import * as Cartesian from "@shared/cartesian/index";

export function getScale({
  datasets,
}: Omit<PieChartData, "labels">): PieChartScale {
  const total = datasets.reduce((sum, dataset) => {
    const values = Array.isArray(dataset.values) ? dataset.values : [];
    const datasetSum = values.reduce((acc, value) => {
      return acc + (typeof value === "number" ? value : 0);
    }, 0);

    return sum + datasetSum;
  }, 0);

  return { total };
}
