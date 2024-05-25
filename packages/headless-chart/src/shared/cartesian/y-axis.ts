import type { CartesianProps } from "./types";
import {
  Column,
  CrossAxisAlignment,
  FractionalTranslation,
  MainAxisAlignment,
  MainAxisSize,
  Offset,
  Row,
  VerticalDirection,
} from "@meursyphus/flitter";
import { IgnoreSize } from "@utils/index";

export function YAxis(
  ...[{ labels, tick, line }, { type }]: Parameters<
    CartesianProps["yAxis"]
  >
) {
  const tickCount = labels.length + (type === "label" ? 1 : 0);
  return Row({
    mainAxisSize: MainAxisSize.min,
    children: [
      Column({
        crossAxisAlignment: CrossAxisAlignment.end,
        verticalDirection:
          type === "value"
            ? VerticalDirection.up
            : VerticalDirection.down,
        mainAxisAlignment:
          type === "label"
            ? MainAxisAlignment.spaceAround
            : MainAxisAlignment.spaceBetween,
        children: labels.map((child) =>
          IgnoreSize({ child, ignoreHeight: true }),
        ),
      }),
      Column({
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: Array.from({ length: tickCount }, (_, index) =>
          FractionalTranslation({
            translation: new Offset({
              y: index === tickCount - 1 ? 1 : 0,
              x: 0,
            }),
            child: tick,
          }),
        ),
      }),
      line,
    ],
  });
}
