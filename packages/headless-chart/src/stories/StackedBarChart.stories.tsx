import type { Meta, StoryObj } from "@storybook/react-vite";
import { StackedBarChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Cartesian/StackedBarChart",
};
export default meta;

const data = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    { legend: "Electronics", values: [120, 150, 180, 200] },
    { legend: "Clothing", values: [80, 90, 100, 110] },
    { legend: "Food", values: [60, 70, 65, 80] },
  ],
};

export const Vertical: StoryObj = {
  render: () => <ChartWrapper widget={StackedBarChart({ data })} />,
};

export const Horizontal: StoryObj = {
  render: () => (
    <ChartWrapper
      widget={StackedBarChart({ data, direction: "horizontal" })}
    />
  ),
};
