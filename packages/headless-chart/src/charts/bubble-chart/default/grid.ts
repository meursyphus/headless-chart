import * as Cartesian from "@shared/cartesian/index";
import { BubbleChartCustom } from "../types";

export function Grid(
  ...[{ xLine, yLine }, { scale }]: Parameters<BubbleChartCustom["grid"]>
) {
  const x = (scale.x.max - scale.x.min)/ scale.x.step;
  const y = (scale.y.max - scale.y.min)/ scale.y.step;

  return Cartesian.Grid({
    xLine,
    yLine,
    x,
    y,
  });
}
