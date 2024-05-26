import type { CartesianCustom } from "./types";
import { Container, type Widget } from "@meursyphus/flitter";

export function XAxisTick(_: Parameters<CartesianCustom["xAxisTick"]>[0]): Widget {
  return Container({
    width: 1,
    height: 4,
    color: "black",
  });
}
