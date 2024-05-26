import type { CartesianCustom } from "./types";
import { SizedBox, type Widget } from "@meursyphus/flitter";

export function DataLabel(config: Parameters<CartesianCustom["dataLabel"]>[0]): Widget {
  return SizedBox.shrink();
}
