import type { PieChartCustom } from "../types";
import * as Cartesian from "@shared/cartesian/index";
import { Container, type Widget } from "@meursyphus/flitter";

function EmptyWidget(): Widget {
  return Container({
    width: 0,
    height: 0,
  });
}

export function Plot(...args: Parameters<PieChartCustom["plot"]>) {
  const { series, grid } = args[0];

  return Cartesian.Plot({
    xAxis: EmptyWidget(),
    yAxis: EmptyWidget(),
    series,
    grid,
  });
}
