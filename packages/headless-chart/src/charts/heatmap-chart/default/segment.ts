import { Container } from "@meursyphus/flitter";
import type { HeatmapCustom } from "../types";

export function Segment(
  ...[{ value, xIndex, yIndex }]: Parameters<HeatmapCustom["segment"]>
) {
  return Container({
    width: 100,
    height: 100,
    color: "black",
  });
}
