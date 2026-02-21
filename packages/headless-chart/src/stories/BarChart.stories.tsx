import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { Source } from "@storybook/addon-docs/blocks";

const meta: Meta = {
  title: "Cartesian/BarChart",
  parameters: {
    docs: {
      description: {
        component:
          "A flexible bar chart supporting vertical and horizontal orientations with multiple datasets.",
      },
    },
  },
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
  render: () => (
    <ChartWrapper
      widget={BarChart({ data })}
      title="Vertical Bar Chart"
      description="Compare values across categories with grouped vertical bars."
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { BarChart } from "headless-chart";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    { legend: "Revenue", values: [120, 150, 180, 90, 200, 170] },
    { legend: "Expenses", values: [80, 100, 130, 70, 150, 120] },
  ],
};

const widget = BarChart({ data });`,
      },
    },
  },
};

export const Horizontal: StoryObj = {
  render: () => (
    <ChartWrapper
      widget={BarChart({ data, direction: "horizontal" })}
      title="Horizontal Bar Chart"
      description="Horizontal orientation is great for long category labels."
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { BarChart } from "headless-chart";

const widget = BarChart({
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      { legend: "Revenue", values: [120, 150, 180, 90, 200, 170] },
      { legend: "Expenses", values: [80, 100, 130, 70, 150, 120] },
    ],
  },
  direction: "horizontal",
});`,
      },
    },
  },
};
