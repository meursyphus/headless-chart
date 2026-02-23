import type { Meta, StoryObj } from "@storybook/react-vite";
import { WaterfallChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { cartesianToastCustom } from "./toastCustom";
import { Container, BoxDecoration } from "@meursyphus/flitter";

const meta: Meta = {
  title: "Cartesian/WaterfallChart",
};
export default meta;

const data = {
  labels: ["Revenue", "COGS", "Gross Profit", "OpEx", "Tax", "Net Income"],
  values: [500, -200, 300, -150, -50, 100],
  totalIndices: [2, 5],
};

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Income Statement"
      description="Inspired by Toast"
      widget={WaterfallChart({
        data,
        custom: {
          ...cartesianToastCustom,
          bar: ({ type }: any) => {
            const color =
              type === "increase"
                ? "#00a9ff"
                : type === "decrease"
                  ? "#ff5a46"
                  : "#00bd9f";
            return Container({
              decoration: new BoxDecoration({ color }),
            });
          },
        },
      })}
    />
  ),
};
