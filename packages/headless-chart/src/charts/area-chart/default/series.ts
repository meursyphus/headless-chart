import type { AreaChartCustom } from "../types";
import { Stack, Positioned } from "@meursyphus/flitter";

export function Series(
  ...[{ areas: lines }]: Parameters<AreaChartCustom["series"]>
) {
  return Stack({
    children: lines.map((line) =>
      Positioned.fill({
        child: line,
      }),
    ),
  });
}
