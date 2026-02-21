import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadarChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";

const meta: Meta = {
  title: "Circular/RadarChart",
};
export default meta;

const data = {
  labels: ["Attack", "Defense", "Speed", "HP", "Sp.Atk", "Sp.Def"],
  datasets: [
    { legend: "Pikachu", values: [55, 40, 90, 35, 50, 50] },
    { legend: "Bulbasaur", values: [49, 49, 45, 45, 65, 65] },
  ],
};

export const Default: StoryObj = {
  render: () => <ChartWrapper widget={RadarChart({ data })} />,
};
