import { Container, type Widget } from "@meursyphus/flitter";

export function GridXLine({ color = "black" }: { color?: string } = {}): Widget {
  return Container({
    width: Infinity,
    height: 1,
    color,
  });
}
