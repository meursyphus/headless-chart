import React from "react";
import ReactWidget from "@meursyphus/flitter-react";
import type { Widget } from "@meursyphus/flitter";

export function ChartWrapper({
  widget,
  width = "600px",
  height = "400px",
  title,
  description,
  renderer = "svg",
}: {
  widget: Widget;
  width?: string;
  height?: string;
  title?: string;
  description?: string;
  renderer?: "svg" | "canvas";
}) {
  return (
    <div className="chart-container" style={{ width, minHeight: height }}>
      {title && <div className="chart-title">{title}</div>}
      {description && <div className="chart-description">{description}</div>}
      <div style={{ width: "100%", height }}>
        <ReactWidget
          widget={widget}
          width="100%"
          height="100%"
          renderer={renderer}
        />
      </div>
    </div>
  );
}
