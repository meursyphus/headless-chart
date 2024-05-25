import type { CartesianProps } from "./types";
import { SizedBox } from "@meursyphus/flitter";

export function DataLabel(config: Parameters<CartesianProps["dataLabel"]>[0]) {
  return SizedBox.shrink();
}
