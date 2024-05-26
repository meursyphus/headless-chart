import type { CartesianCustom } from "./types";
import { Text, type Widget } from "@meursyphus/flitter";

export function Title({ name }: Parameters<CartesianCustom["title"]>[0]): Widget {
  return Text(name);
}
