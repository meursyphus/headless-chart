import type { TreemapCustom } from "../types";
import {
  Stack,
  type Widget,
} from "@meursyphus/flitter";

export function Treemap(
  ...[{ nodes }]: Parameters<TreemapCustom["treemap"]>
): Widget {
  return Stack({
    children: nodes,
  });
}
