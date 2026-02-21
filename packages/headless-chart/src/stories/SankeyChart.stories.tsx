import type { Meta, StoryObj } from "@storybook/react-vite";
import { SankeyChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Specialized/SankeyChart",
};
export default meta;

const data = {
  nodes: [
    { id: "solar", label: "Solar" },
    { id: "wind", label: "Wind" },
    { id: "hydro", label: "Hydro" },
    { id: "grid", label: "Grid" },
    { id: "home", label: "Home" },
    { id: "industry", label: "Industry" },
  ],
  links: [
    { source: "solar", target: "grid", value: 40 },
    { source: "wind", target: "grid", value: 30 },
    { source: "hydro", target: "grid", value: 20 },
    { source: "grid", target: "home", value: 50 },
    { source: "grid", target: "industry", value: 40 },
  ],
};

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper widget={SankeyChart({ data })} width="700px" height="450px" />
  ),
};
