import type { Meta, StoryObj } from "@storybook/react-vite";
import { LineChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Cartesian/LineChart",
};
export default meta;

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    { legend: "This Week", values: [30, 45, 28, 60, 55, 70, 65] },
    { legend: "Last Week", values: [20, 35, 40, 45, 50, 55, 45] },
  ],
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={LineChart({ data })} />,
};
