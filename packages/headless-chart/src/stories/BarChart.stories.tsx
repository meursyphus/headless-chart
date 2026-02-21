import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Cartesian/BarChart",
};
export default meta;

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    { legend: "Revenue", values: [120, 150, 180, 90, 200, 170] },
    { legend: "Expenses", values: [80, 100, 130, 70, 150, 120] },
  ],
};

export const Vertical: StoryObj = {
  render: () => <ChartWrapper widget={BarChart({ data })} />,
};

export const Horizontal: StoryObj = {
  render: () => (
    <ChartWrapper widget={BarChart({ data, direction: "horizontal" })} />
  ),
};
