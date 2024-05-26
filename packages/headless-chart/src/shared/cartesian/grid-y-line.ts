import { Container, type Widget } from "@meursyphus/flitter";

export function GridYLine({ color = "black" }: { color?: string } = {}): Widget {
  return Container({
    width: 1,
    height: Infinity,
    color,
  });
}
