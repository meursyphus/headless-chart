import type { PieChartCustom } from "../types";
import { Stack, type Widget } from "@meursyphus/flitter";
import { Segment } from "./segment";

function createSegmentWidgets(
  arcs: Array<{
    value?: number;
    legend?: string;
    startAngle?: number;
    endAngle?: number;
  }>,
  total: number,
  context: any,
): Widget[] {
  let startAngle = 0;

  return arcs.map((arc, index) => {
    const value = arc.value ?? 0;
    const legend = arc.legend ?? "gray";

    const angle = (value / total) * 360;
    const endAngle = startAngle + angle;

    const segmentWidget = Segment(
      {
        value,
        legend,
        startAngle,
        endAngle,
        index,
      },
      context,
    );

    startAngle = endAngle;
    return segmentWidget;
  });
}
export function Segments(
  ...[{ arcs = [], total }, context]: Parameters<PieChartCustom["segments"]>
): Widget {
  const segmentWidgets = createSegmentWidgets(arcs, total, context);

  return Stack({
    children: segmentWidgets,
  });
}
