import type { CartesianProps } from "./types";
import { Container } from "@meursyphus/flitter";

export function YAxisTick(_: Parameters<CartesianProps["yAxisTick"]>[0]) {
  return Container({
    width: 4,
    height: 1,
    color: "black",
  });
}
