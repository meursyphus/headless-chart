import type { Meta, StoryObj } from "@storybook/react-vite";
import { BoxPlotChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Cartesian/BoxPlotChart",
};
export default meta;

const data = {
  labels: ["Math", "Science", "English", "History"],
  datasets: [
    {
      legend: "Scores",
      data: [
        { min: 45, q1: 60, median: 72, q3: 85, max: 98, outliers: [30] },
        { min: 50, q1: 65, median: 75, q3: 88, max: 95 },
        { min: 40, q1: 55, median: 68, q3: 80, max: 92, outliers: [25, 98] },
        { min: 55, q1: 62, median: 70, q3: 82, max: 90 },
      ],
    },
  ],
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={BoxPlotChart({ data })} />,
};
