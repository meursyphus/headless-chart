import type { Meta, StoryObj } from "@storybook/react-vite";
import { PieChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Circular/PieChart",
};
export default meta;

const data = {
  labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
  values: [65, 18, 8, 5, 4],
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={PieChart({ data })} />,
};

export const Donut: StoryObj = {
  render: () => (
    <ChartWrapper widget={PieChart({ data, innerRadius: 0.5 })} />
  ),
};
