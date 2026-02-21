import type { Meta, StoryObj } from "@storybook/react-vite";
import { AreaChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Cartesian/AreaChart",
};
export default meta;

const data = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    { legend: "Product A", values: [40, 60, 80, 100] },
    { legend: "Product B", values: [30, 50, 45, 70] },
  ],
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={AreaChart({ data })} />,
};
