import type { Meta, StoryObj } from "@storybook/react-vite";
import { BoxPlotChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { cartesianToastCustom } from "./toastCustom";
import {
  Text,
  TextStyle,
  Container,
  EdgeInsets,
  Column,
  CrossAxisAlignment,
  Expanded,
  SizedBox,
  StatefulWidget,
  State,
  AnimationController,
  Tween,
  CurvedAnimation,
  Curves,
  ClipRect,
  Rect,
  Opacity,
} from "@meursyphus/flitter";
import type { Widget } from "@meursyphus/flitter";

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

class AnimatedBoxPlotGroup extends StatefulWidget {
  child: Widget;
  index: number;

  constructor({ child, index }: { child: Widget; index: number }) {
    super();
    this.child = child;
    this.index = index;
  }

  createState(): State<AnimatedBoxPlotGroup> {
    return new AnimatedBoxPlotGroupState();
  }
}

class AnimatedBoxPlotGroupState extends State<AnimatedBoxPlotGroup> {
  animationController!: AnimationController;
  growAnim!: Tween;
  opacityAnim!: Tween;

  override initState(): void {
    super.initState();
    this.animationController = new AnimationController({
      duration: 500,
    });
    this.growAnim = new Tween({ begin: 0, end: 1 }).animate(
      new CurvedAnimation({
        parent: this.animationController,
        curve: Curves.easeOut,
      })
    );
    this.opacityAnim = new Tween({ begin: 0, end: 1 }).animate(
      new CurvedAnimation({
        parent: this.animationController,
        curve: Curves.easeOut,
      })
    );
    setTimeout(() => {
      this.animationController.forward();
    }, this.widget.index * 120);
  }

  override dispose(): void {
    this.animationController.dispose();
    super.dispose();
  }

  override build() {
    return Opacity({
      opacity: this.opacityAnim.value,
      child: ClipRect({
        clipped: true,
        clipper: ({ width, height }: { width: number; height: number }) =>
          Rect.fromLTRB({
            left: 0,
            top: height * (1 - this.growAnim.value),
            right: width,
            bottom: height,
          }),
        child: this.widget.child,
      }),
    });
  }
}

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Exam Score Distribution"
      description="Inspired by Toast"
      widget={BoxPlotChart({
        data,
        custom: {
          ...cartesianToastCustom,
          layout: ({ plot }: any) =>
            Container({
              padding: EdgeInsets.only({
                left: 40,
                bottom: 30,
                top: 20,
                right: 15,
              }),
              child: Column({
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text("Inspired by Toast", {
                    style: new TextStyle({
                      fontSize: 13,
                      color: "#999999",
                      fontFamily: "Noto Sans JP",
                    }),
                  }),
                  SizedBox({ height: 4 }),
                  Expanded({ child: plot }),
                ],
              }),
            }),
          boxPlotGroup: ({ boxPlots, index }: any) =>
            new AnimatedBoxPlotGroup({
              index,
              child: boxPlots[0],
            }),
        },
      })}
    />
  ),
};
