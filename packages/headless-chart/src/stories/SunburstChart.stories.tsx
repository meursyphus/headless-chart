import type { Meta, StoryObj } from "@storybook/react-vite";
import { SunburstChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { toastColors } from "./toastCustom";
import {
  Text,
  Container,
  EdgeInsets,
  TextStyle,
  Stack,
  Positioned,
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
  title: "Circular/SunburstChart",
};
export default meta;

class AnimatedSunburstClip extends StatefulWidget {
  child: Widget;

  constructor({ child }: { child: Widget }) {
    super();
    this.child = child;
  }

  createState(): State<AnimatedSunburstClip> {
    return new AnimatedSunburstClipState();
  }
}

class AnimatedSunburstClipState extends State<AnimatedSunburstClip> {
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
        child: (this.widget as AnimatedSunburstClip).child,
      }),
    });
  }
}

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
  render: () => (
    <ChartWrapper
      title="Organization Structure"
      description="Inspired by Toast"
      widget={SunburstChart({
        data,
        custom: {
          layout: ({ sunburst }: any) =>
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
                  new AnimatedSunburstClip({ child: sunburst }),
                ],
              }),
            }),
        },
      })}
    />
  ),
};
