import type { Meta, StoryObj } from "@storybook/react-vite";
import { StackedAreaChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { cartesianToastCustom, toastColors } from "./toastCustom";
import { CustomPaint, Path } from "@meursyphus/flitter";

const meta: Meta = {
  title: "Cartesian/StackedAreaChart",
};
export default meta;

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    { legend: "Organic", values: [40, 50, 60, 55, 70, 80] },
    { legend: "Paid", values: [30, 35, 40, 45, 50, 55] },
    { legend: "Referral", values: [20, 25, 20, 30, 25, 35] },
  ],
};

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Traffic Sources"
      description="Inspired by Toast"
      widget={StackedAreaChart({
        data,
        custom: {
          ...cartesianToastCustom,
          area: ({ values, cumulativeValues, index }: any, { scale }: any) => {
            return CustomPaint({
              painter: {
                svg: {
                  createDefaultSvgEl(context: any) {
                    return {
                      areaPath: context.createSvgEl("path"),
                      linePath: context.createSvgEl("path"),
                    };
                  },
                  paint({ areaPath, linePath }: any, { width, height }: any) {
                    const toY = (v: number) =>
                      height - ((v - scale.min) / (scale.max - scale.min)) * height;
                    const toX = (i: number) => (i / (values.length - 1)) * width;

                    const topPoints = cumulativeValues.map((v: number, i: number) => ({
                      x: toX(i),
                      y: toY(v),
                    }));
                    const bottomValues = cumulativeValues.map(
                      (v: number, i: number) => v - values[i]
                    );
                    const bottomPoints = bottomValues
                      .map((v: number, i: number) => ({ x: toX(i), y: toY(v) }))
                      .reverse();

                    const areaP = new Path();
                    areaP.moveTo(topPoints[0]);
                    topPoints.slice(1).forEach((p: any) => areaP.lineTo(p));
                    bottomPoints.forEach((p: any) => areaP.lineTo(p));
                    areaP.close();

                    const color = toastColors[index % toastColors.length];
                    areaPath.setAttribute("fill", color);
                    areaPath.setAttribute("opacity", "0.6");
                    areaPath.setAttribute("d", areaP.getD());

                    const lineP = new Path();
                    lineP.moveTo(topPoints[0]);
                    topPoints.slice(1).forEach((p: any) => lineP.lineTo(p));
                    linePath.setAttribute("fill", "none");
                    linePath.setAttribute("stroke", color);
                    linePath.setAttribute("stroke-width", "2");
                    linePath.setAttribute("d", lineP.getD());
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
