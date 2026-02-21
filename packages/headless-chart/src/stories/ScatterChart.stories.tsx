import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScatterChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Cartesian/ScatterChart",
};
export default meta;

const data = {
  datasets: [
    {
      legend: "Group A",
      data: [
        { x: 10, y: 20, label: "A1" },
        { x: 30, y: 40, label: "A2" },
        { x: 50, y: 30, label: "A3" },
        { x: 70, y: 60, label: "A4" },
      ],
    },
    {
      legend: "Group B",
      data: [
        { x: 20, y: 50, label: "B1" },
        { x: 40, y: 20, label: "B2" },
        { x: 60, y: 70, label: "B3" },
        { x: 80, y: 45, label: "B4" },
      ],
    },
  ],
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={ScatterChart({ data })} />,
};
