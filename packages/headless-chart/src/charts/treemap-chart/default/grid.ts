import * as Cartesian from "@shared/cartesian";
import { TreeMapChartCustom } from "../types";

export function Grid(
  ...[{ xLines, yLines }, { data }]: Parameters<TreeMapChartCustom["grid"]>
) {
  const totalBlocks = data.datasets.length;

  return Cartesian.Grid({
    xLine: xLines,
    yLine: yLines,
    x: Math.ceil(Math.sqrt(totalBlocks)),
    y: Math.ceil(Math.sqrt(totalBlocks)),
  });
}
