import type { Meta, StoryObj } from "@storybook/react-vite";
import { StackedAreaChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

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
  render: () => <ChartWrapper widget={StackedAreaChart({ data })} />,
};
