import type { PieChartCustom } from "../types";
import { Container, Flexible, Flex, Axis } from "@meursyphus/flitter";

export function Series(
  ...[{ pieGroups }]: Parameters<PieChartCustom["series"]>
) {
  return Container({
    width: Infinity,
    height: Infinity,
    child: Flex({
      direction: Axis.horizontal,
      children: pieGroups.map((pieGroup) =>
        Flexible({ flex: 1, child: pieGroup }),
      ),
    }),
  });
}
