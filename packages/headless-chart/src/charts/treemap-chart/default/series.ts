import type { TreeMapChartCustom } from "../types";
import { Stack, Positioned } from "@meursyphus/flitter";

export function Series(
  ...[{ areas }]: Parameters<TreeMapChartCustom["series"]>
) {
  return Stack({
    children: areas.map((area) =>
      Positioned.fill({
        child: area,
      }),
    ),
  });
}
