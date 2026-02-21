import type { Meta, StoryObj } from "@storybook/react-vite";
import { SunburstChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Circular/SunburstChart",
};
export default meta;

const data = {
  root: {
    label: "Company",
    children: [
      {
        label: "Engineering",
        children: [
          { label: "Frontend", value: 30 },
          { label: "Backend", value: 25 },
          { label: "DevOps", value: 10 },
        ],
      },
      {
        label: "Design",
        children: [
          { label: "UI/UX", value: 15 },
          { label: "Brand", value: 8 },
        ],
      },
      {
        label: "Sales",
        children: [
          { label: "Domestic", value: 20 },
          { label: "International", value: 12 },
        ],
      },
    ],
  },
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={SunburstChart({ data })} />,
};
