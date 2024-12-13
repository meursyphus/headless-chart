import type { BubbleChartCustom } from "../types";
import { CustomPaint } from "@meursyphus/flitter";

export function Bubble(
  ...[{ points, legend, index }, { scale }]: Parameters<BubbleChartCustom["bubble"]>
) {
  return CustomPaint({
    painter: {
      svg: {
        createDefaultSvgEl: (context) => {
          return {
            g: context.createSvgEl("g")
          };
        },
        paint: ({ g }, { width, height }) => {
          points.forEach((pt) => {
            const { x, y, value } = pt;
            
            const normX = (x - scale.x.min) / (scale.x.max - scale.x.min);
            const normY = (y - scale.y.min) / (scale.y.max - scale.y.min);
            const cx = normX * width;
            const cy = height - (normY * height);

            const normValue = (value - scale.value.min) / (scale.value.max - scale.value.min);
            const radius = 5 + normValue * 20;

            const circle = g.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", cx.toString());
            circle.setAttribute("cy", cy.toString());
            circle.setAttribute("r", radius.toString());
            circle.setAttribute("fill", "rgba(0,0,255,0.5)");
            circle.setAttribute("stroke", "blue");
            circle.setAttribute("stroke-width", "1");
            g.appendChild(circle);
          });
        },
      },
      canvas: {
        paint: (context, { width, height }) => {
          const ctx = context.canvas;
          points.forEach((pt) => {
            const { x, y, value } = pt;
            const normX = (x - scale.x.min) / (scale.x.max - scale.x.min);
            const normY = (y - scale.y.min) / (scale.y.max - scale.y.min);
            const cx = normX * width;
            const cy = height - (normY * height);

            const normValue = (value - scale.value.min) / (scale.value.max - scale.value.min);
            const radius = 5 + normValue * 20;

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0,0,255,0.5)";
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();
          });
        },
      },
    },
  });
}
