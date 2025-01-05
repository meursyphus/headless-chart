import type { PieChartCustom } from "../types";
import { Stack } from "@meursyphus/flitter";

export function Series(
  ...[{ pie, scale }, context]: Parameters<PieChartCustom["series"]>
) {
  const totalValue = pie.reduce((sum, slice) => sum + slice.value, 0);

  let currentAngle = 0;

  const children = pie.map((slice, index) => {
    const startAngle = currentAngle;
    const sweepAngle = (slice.value / totalValue) * 360;
    const endAngle = startAngle + sweepAngle;
    currentAngle = endAngle;

    return context.custom.pie(
      {
        startAngle,
        endAngle,
        centerX: scale.scale.centerX,
        centerY: scale.scale.centerY,
        radius: scale.scale.radius,
        color: "gray",
        value: slice.value,
        legend: slice.legend,
        index,
      },
      context,
    );
  });

  return Stack({ children });
}
