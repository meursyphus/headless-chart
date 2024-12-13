import type { BubbleChartCustom } from "../types";
import { Stack, Positioned } from "@meursyphus/flitter";

export function Series(...[{ bubbles }]: Parameters<BubbleChartCustom["series"]>) {
  return Stack({
    children: bubbles.map((bubble) =>
      Positioned.fill({
        child: bubble,
      }),
    ),
  });
}
