import type { TreemapCustom } from "../types";
import { Row, type Widget } from "@meursyphus/flitter";

export function Legend(
  ...[{ items }]: Parameters<TreemapCustom["legend"]>
): Widget {
  return Row({
    children: items,
  });
}
