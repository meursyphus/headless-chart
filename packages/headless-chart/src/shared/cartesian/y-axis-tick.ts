import type { CartesianCustom } from "./types";
import { Container, type Widget } from "@meursyphus/flitter";

export function YAxisTick(_: Parameters<CartesianCustom["yAxisTick"]>[0]): Widget {
  return Container({
    width: 4,
    height: 1,
    color: "black",
  });
}
