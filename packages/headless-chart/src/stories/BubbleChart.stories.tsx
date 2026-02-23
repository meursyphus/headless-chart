import type { Meta, StoryObj } from "@storybook/react-vite";
import { BubbleChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { cartesianToastCustom, toastColors } from "./toastCustom";
import {
  Container,
  BoxDecoration,
  BorderRadius,
} from "@meursyphus/flitter";

const meta: Meta = {
  title: "Cartesian/BubbleChart",
};
export default meta;

const data = {
  datasets: [
    {
      legend: "Asia",
      data: [
        { x: 20, y: 40, value: 20, label: "Korea" },
        { x: 40, y: 60, value: 35, label: "Japan" },
        { x: 60, y: 50, value: 50, label: "China" },
      ],
    },
    {
      legend: "Europe",
      data: [
        { x: 30, y: 55, value: 25, label: "Germany" },
        { x: 50, y: 35, value: 30, label: "France" },
        { x: 70, y: 65, value: 15, label: "UK" },
      ],
    },
  ],
};

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Continental GDP vs Population"
      description="Inspired by Toast"
      widget={BubbleChart({
        data,
        custom: {
          ...cartesianToastCustom,
          bubble: ({ legend }: any) => {
            const idx = data.datasets.findIndex((d) => d.legend === legend);
            const color = toastColors[idx % toastColors.length];
            return Container({
              decoration: new BoxDecoration({
                color: color + "80",
                borderRadius: BorderRadius.circular(999),
              }),
            });
          },
        },
      })}
    />
  ),
};
