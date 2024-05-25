import type { LineChartCustom } from "../types";
import { Stack, Positioned } from "@meursyphus/flitter";

export function Series(...[{ lines }]: Parameters<LineChartCustom["series"]>) {
  return Stack({
    children: lines.map((line) =>
      Positioned.fill({
        child: line,
      }),
    ),
  });
}
