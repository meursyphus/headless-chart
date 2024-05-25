import type { CartesianProps } from "./types";
import { Container } from "@meursyphus/flitter";

export function XAxisTick(_: Parameters<CartesianProps["xAxisTick"]>[0]) {
  return Container({
    width: 1,
    height: 4,
    color: "black",
  });
}
