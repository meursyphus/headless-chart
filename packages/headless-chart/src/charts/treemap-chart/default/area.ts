import type { TreeMapChartCustom } from "../types";
import { CustomPaint } from "@meursyphus/flitter";

export function Area(
  ...[{ values, legend, index }]: Parameters<TreeMapChartCustom["area"]>
) {
  return CustomPaint({
    painter: {
      svg: {
        createDefaultSvgEl: (context) => {
          return {
            group: context.createSvgEl("g"),
          };
        },
        paint: ({ group }, { width, height }) => {
          const blocks = createTreeMapBlocks({ values, width, height });

          if (!blocks.length) {
            console.warn("No blocks to render for SVG.");
            return;
          }

          blocks.forEach(({ x = 0, y = 0, w = 10, h = 10 }, idx) => {
            const rect = group.ownerDocument.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect",
            );

            rect.setAttribute("x", `${x}`);
            rect.setAttribute("y", `${y}`);
            rect.setAttribute("width", `${w}`);
            rect.setAttribute("height", `${h}`);
            rect.setAttribute("fill", `var(--color-${index + idx})`);
            rect.setAttribute("stroke", "white");
            rect.setAttribute("stroke-width", "1");

            group.appendChild(rect);
          });
        },
      },
      canvas: {
        paint: (context, { width, height }) => {
          const blocks = createTreeMapBlocks({ values, width, height });

          if (!blocks.length) {
            console.warn("No blocks to render for Canvas.");
            return;
          }

          context.canvas.lineWidth = 1;

          blocks.forEach(({ x = 0, y = 0, w = 10, h = 10 }, idx) => {
            context.canvas.fillStyle = `var(--color-${index + idx})`;
            context.canvas.fillRect(x, y, w, h);
            context.canvas.strokeStyle = "white";
            context.canvas.strokeRect(x, y, w, h);
          });
        },
      },
    },
  });
}

function createTreeMapBlocks({
  values = [],
  width,
  height,
}: {
  values: number[];
  width: number;
  height: number;
}) {
  if (!values.length) {
    console.warn("No values provided for TreeMap blocks.");
    return [];
  }

  const total = values.reduce((sum, v) => sum + v, 0);
  let x = 0;
  let y = 0;

  return values.map((value) => {
    const proportion = value / total;
    const blockWidth = width * proportion || 10;
    const blockHeight = height * proportion || 10;

    const block = { x: x || 0, y: y || 0, w: blockWidth, h: blockHeight };

    x += blockWidth;

    if (x >= width) {
      x = 0;
      y += blockHeight;
    }

    return block;
  });
}
