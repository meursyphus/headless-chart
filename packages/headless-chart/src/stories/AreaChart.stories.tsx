import type { Meta, StoryObj } from "@storybook/react-vite";
import { AreaChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { cartesianToastCustom, toastColors } from "./toastCustom";
import { CustomPaint, Path } from "@meursyphus/flitter";

const meta: Meta = {
  title: "Cartesian/AreaChart",
};
export default meta;

const data = {
  labels: ["plane", "helicopter", "boat", "train", "subway", "bus", "car", "moto", "bicycle", "horse", "skateboard", "others"],
  datasets: [
    { legend: "Norway", values: [600, 1000, 800, 1000, 500, 850, 600, 675, 720, 890, 700, 950] },
    { legend: "Germany", values: [565, 850, 734, 863, 268, 571, 396, 588, 442, 726, 640, 732] },
    { legend: "US", values: [435, 559, 482, 580, 167, 308, 255, 557, 437, 438, 543, 554] },
  ],
};

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Transportation by Country"
      description="Inspired by Toast"
      widget={AreaChart({
        data,
        custom: {
          ...cartesianToastCustom,
          area: ({ values, index }: any, { scale }: any) => {
            return CustomPaint({
              painter: {
                svg: {
                  createDefaultSvgEl(context: any) {
                    return {
                      linePath: context.createSvgEl("path"),
                      areaPath: context.createSvgEl("path"),
                    };
                  },
                  paint({ linePath, areaPath }: any, { width, height }: any) {
                    const path = new Path();
                    const points = values.map((val: number, i: number) => ({
                      x: (i / (values.length - 1)) * width,
                      y: height - ((val - scale.min) / (scale.max - scale.min)) * height,
                    }));
                    path.moveTo(points[0]);
                    points.slice(1).forEach((p: any) => path.lineTo(p));

                    const color = toastColors[index % toastColors.length];
                    linePath.setAttribute("stroke", color);
                    linePath.setAttribute("fill", "none");
                    linePath.setAttribute("stroke-width", "2");
                    linePath.setAttribute("d", path.getD());

                    const zeroY = height - ((0 - scale.min) / (scale.max - scale.min)) * height;
                    path.lineTo({ x: width, y: zeroY }).lineTo({ x: 0, y: zeroY }).close();
                    areaPath.setAttribute("fill", color);
                    areaPath.setAttribute("opacity", "0.3");
                    areaPath.setAttribute("d", path.getD());
                  },
                },
              },
            });
          },
        },
      })}
    />
  ),
};
