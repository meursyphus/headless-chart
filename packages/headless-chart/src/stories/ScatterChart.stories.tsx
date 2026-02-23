import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScatterChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { cartesianToastCustom, toastColors } from "./toastCustom";
import {
  Container,
  BoxDecoration,
  BorderRadius,
} from "@meursyphus/flitter";

const meta: Meta = {
  title: "Cartesian/ScatterChart",
};
export default meta;

const data = {
  datasets: [
    {
      legend: "Asia",
      data: [
        { x: 15, y: 35, label: "Korea" },
        { x: 25, y: 55, label: "Japan" },
        { x: 45, y: 45, label: "China" },
        { x: 55, y: 65, label: "India" },
      ],
    },
    {
      legend: "Europe",
      data: [
        { x: 30, y: 50, label: "Germany" },
        { x: 40, y: 30, label: "France" },
        { x: 60, y: 70, label: "UK" },
        { x: 70, y: 40, label: "Italy" },
      ],
    },
    {
      legend: "Americas",
      data: [
        { x: 20, y: 60, label: "USA" },
        { x: 35, y: 25, label: "Brazil" },
        { x: 50, y: 50, label: "Canada" },
        { x: 80, y: 75, label: "Mexico" },
      ],
    },
  ],
};

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Economic Indicators"
      description="Inspired by Toast"
      widget={ScatterChart({
        data,
        custom: {
          ...cartesianToastCustom,
          scatter: ({ legend }: any) => {
            const idx = data.datasets.findIndex((d) => d.legend === legend);
            return Container({
              width: 10,
              height: 10,
              decoration: new BoxDecoration({
                color: toastColors[idx % toastColors.length],
                borderRadius: BorderRadius.circular(5),
              }),
            });
          },
        },
      })}
    />
  ),
};
