import type { Meta, StoryObj } from "@storybook/react-vite";
import { PieChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { toastColors } from "./toastCustom";
import {
  Text,
  Container,
  EdgeInsets,
  TextStyle,
  Stack,
  Positioned,
  Row,
  SizedBox,
  BoxDecoration,
  BorderRadius,
  StatefulWidget,
  State,
  AnimationController,
  Tween,
  CurvedAnimation,
  Curves,
  ClipRect,
  Rect,
  Opacity,
  type Widget,
} from "@meursyphus/flitter";

const meta: Meta = {
  title: "Circular/PieChart",
};
export default meta;

class AnimatedPieClip extends StatefulWidget {
  child: Widget;

  constructor({ child }: { child: Widget }) {
    super();
    this.child = child;
  }

  createState(): State<AnimatedPieClip> {
    return new AnimatedPieClipState();
  }
}

class AnimatedPieClipState extends State<AnimatedPieClip> {
  animationController!: AnimationController;
  growAnim!: Tween;
  opacityAnim!: Tween;

  initState(): void {
    super.initState();
    this.animationController = new AnimationController({
      duration: 800,
    });
    this.growAnim = new Tween({ begin: 0, end: 1 }).animated(
      new CurvedAnimation({
        parent: this.animationController,
        curve: Curves.easeOut,
      })
    );
    this.opacityAnim = new Tween({ begin: 0, end: 1 }).animated(
      new CurvedAnimation({
        parent: this.animationController,
        curve: Curves.easeOut,
      })
    );
    this.animationController.forward();
  }

  build() {
    return Opacity({
      opacity: this.opacityAnim.value,
      child: ClipRect({
        clipped: true,
        clipper: ({ width, height }: { width: number; height: number }) => {
          const hw = (width * this.growAnim.value) / 2;
          const hh = (height * this.growAnim.value) / 2;
          return Rect.fromLTRB({
            left: width / 2 - hw,
            top: height / 2 - hh,
            right: width / 2 + hw,
            bottom: height / 2 + hh,
          });
        },
        child: (this.widget as AnimatedPieClip).child,
      }),
    });
  }
}

const data = {
  labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
  values: [65, 18, 8, 5, 4],
};

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Browser Market Share"
      description="Inspired by Toast"
      widget={PieChart({
        data,
        custom: {
          layout: ({ pie, legends }: any) =>
            Container({
              padding: EdgeInsets.all(20),
              child: Stack({
                children: [
                  Positioned({
                    top: 0,
                    right: 0,
                    child: Text("Inspired by Toast", {
                      style: new TextStyle({
                        fontSize: 13,
                        color: "#999999",
                        fontFamily: "Noto Sans JP",
                      }),
                    }),
                  }),
                  new AnimatedPieClip({ child: pie }),
                ],
              }),
            }),
          legend: ({ name, index }: any) =>
            Row({
              children: [
                Container({
                  width: 10,
                  height: 10,
                  decoration: new BoxDecoration({
                    color: toastColors[index % toastColors.length],
                    borderRadius: BorderRadius.circular(2),
                  }),
                }),
                SizedBox({ width: 6 }),
                Text(name, {
                  style: new TextStyle({
                    fontFamily: "Noto Sans JP",
                    fontSize: 12,
                    color: "#666666",
                  }),
                }),
              ],
            }),
        },
        colors: toastColors.slice(0, data.labels.length),
      })}
    />
  ),
};

export const Donut: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Browser Market Share (Donut)"
      description="Inspired by Toast"
      widget={PieChart({
        data,
        innerRadius: 0.5,
        custom: {
          layout: ({ pie }: any) =>
            Container({
              padding: EdgeInsets.all(20),
              child: Stack({
                children: [
                  Positioned({
                    top: 0,
                    right: 0,
                    child: Text("Inspired by Toast", {
                      style: new TextStyle({
                        fontSize: 13,
                        color: "#999999",
                        fontFamily: "Noto Sans JP",
                      }),
                    }),
                  }),
                  new AnimatedPieClip({ child: pie }),
                ],
              }),
            }),
        },
        colors: toastColors.slice(0, data.labels.length),
      })}
    />
  ),
};
