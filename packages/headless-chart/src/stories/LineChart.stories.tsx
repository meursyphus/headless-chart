import type { Meta, StoryObj } from "@storybook/react-vite";
import { LineChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { cartesianToastCustom, toastColors } from "./toastCustom";
import { CustomPaint, Path } from "@meursyphus/flitter";

const meta: Meta = {
  title: "Cartesian/LineChart",
};
export default meta;

const data = {
  labels: ["01/01", "02/01", "03/01", "04/01", "05/01", "06/01", "07/01", "08/01", "09/01", "10/01", "11/01", "12/01"],
  datasets: [
    { legend: "Seoul", values: [-3.5, -1.1, 4.0, 11.3, 17.5, 21.5, 25.9, 27.2, 24.4, 13.9, 6.6, -0.6] },
    { legend: "Seattle", values: [3.8, 5.6, 7.0, 9.1, 12.4, 15.3, 17.5, 17.8, 15.0, 10.6, 6.6, 3.7] },
    { legend: "Sydney", values: [22.1, 22.0, 20.9, 18.3, 15.2, 12.8, 11.8, 13.0, 15.2, 17.6, 19.4, 21.2] },
  ],
};

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Average Temperature"
      description="Inspired by Toast"
      widget={LineChart({
        data,
        custom: {
          ...cartesianToastCustom,
          line: ({ values, index }: any, { scale }: any) => {
            return CustomPaint({
              painter: {
                svg: {
                  createDefaultSvgEl(context: any) {
                    return { line: context.createSvgEl("path") };
                  },
                  paint({ line }: any, { height, width }: any) {
                    const linePath = new Path();
                    const points = values.map((value: number, i: number) => ({
                      x: (i * width) / (values.length - 1),
                      y: height - (height * (value - scale.min)) / (scale.max - scale.min),
                    }));
                    linePath.moveTo(points[0]);
                    points.slice(1).forEach((p: any) => linePath.lineTo(p));
                    line.setAttribute("fill", "none");
                    line.setAttribute("stroke", toastColors[index % toastColors.length]);
                    line.setAttribute("stroke-width", "2");
                    line.setAttribute("d", linePath.getD());
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
