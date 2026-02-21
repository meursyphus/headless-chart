import type { Meta, StoryObj } from "@storybook/react-vite";
import { BubbleChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Cartesian/BubbleChart",
};
export default meta;

const data = {
  datasets: [
    {
      legend: "Sales",
      data: [
        { x: 20, y: 30, value: 15, label: "Product A" },
        { x: 40, y: 50, value: 25, label: "Product B" },
        { x: 60, y: 40, value: 10, label: "Product C" },
        { x: 80, y: 70, value: 30, label: "Product D" },
      ],
    },
  ],
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={BubbleChart({ data })} />,
};
