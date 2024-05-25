import type { CartesianProps } from "./types";
import {
  Container,
  FractionalTranslation,
  Stack,
  Positioned,
} from "@meursyphus/flitter";

export function Plot({
  series,
  xAxis,
  yAxis,
}: Parameters<CartesianProps["plot"]>[0]) {
  return Stack({
    children: [
      Positioned({
        top: 0,
        left: 0,
        bottom: 0,
        child: FractionalTranslation({
          translation: { x: -1, y: 0 },
          child: yAxis,
        }),
      }),
      Positioned({
        bottom: 0,
        left: 0,
        right: 0,
        child: FractionalTranslation({
          translation: { x: 0, y: 1 },
          child: xAxis,
        }),
      }),
      Positioned({
        bottom: 0,
        left: 0,
        child: FractionalTranslation({
          translation: { x: -1, y: 1 },
          child: Container({
            color: "black",
            width: 1,
            height: 1,
          }),
        }),
      }),
      series,
    ],
  });
}
