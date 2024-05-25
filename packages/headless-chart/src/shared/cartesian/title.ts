import type { CartesianProps } from "./types";
import { Text } from "@meursyphus/flitter";

export function Title({ name }: Parameters<CartesianProps["title"]>[0]) {
  return Text(name);
}
