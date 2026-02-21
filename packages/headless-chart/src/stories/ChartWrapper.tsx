import React from "react";
import ReactWidget from "@meursyphus/flitter-react";
import type { Widget } from "@meursyphus/flitter";

export function ChartWrapper({
  widget,
  width = "600px",
  height = "400px",
  renderer = "svg",
}: {
  widget: Widget;
  width?: string;
  height?: string;
  renderer?: "svg" | "canvas";
}) {
  return (
    <div style={{ width, height }}>
      <ReactWidget
        widget={widget}
        width="100%"
        height="100%"
        renderer={renderer}
      />
    </div>
  );
}
