import type { TreemapCustom } from "../types";
import { Text, type Widget } from "@meursyphus/flitter";

export function Title(
  ...[{ name }]: Parameters<TreemapCustom["title"]>
): Widget {
  return Text(name);
}
