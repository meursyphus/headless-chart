import type { Meta, StoryObj } from "@storybook/react-vite";
import { SankeyChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { toastColors } from "./toastCustom";
import {
  Text,
  Container,
  EdgeInsets,
  TextStyle,
  Stack,
  Positioned,
  BoxDecoration,
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

class AnimatedSankeyReveal extends StatefulWidget {
  child: Widget;

  constructor({ child }: { child: Widget }) {
    super();
    this.child = child;
  }

  createState(): State<AnimatedSankeyReveal> {
    return new AnimatedSankeyRevealState();
  }
}

class AnimatedSankeyRevealState extends State<AnimatedSankeyReveal> {
  animationController!: AnimationController;
  growAnim!: Tween;
  opacityAnim!: Tween;

  initState(): void {
    this.animationController = new AnimationController({
      duration: 800,
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
    this.animationController.forward();
  }

  build() {
    return Opacity({
      opacity: Math.min(this.opacityAnim.value * 2, 1),
      child: ClipRect({
        clipped: true,
        clipper: ({ width, height }: { width: number; height: number }) =>
          Rect.fromLTRB({
            left: 0,
            top: 0,
            right: width * this.growAnim.value,
            bottom: height,
          }),
        child: (this.widget as AnimatedSankeyReveal).child,
      }),
    });
  }
}

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
    <ChartWrapper
      title="Energy Flow"
      description="Inspired by Toast"
      width="700px"
      height="450px"
      widget={SankeyChart({
        data,
        custom: {
          layout: ({ sankey }: any) =>
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
                  new AnimatedSankeyReveal({ child: sankey }),
                ],
              }),
            }),
          node: ({ color }: any) =>
            Container({
              decoration: new BoxDecoration({ color }),
            }),
          nodeLabel: ({ label }: any) =>
            Text(label, {
              style: new TextStyle({
                fontFamily: "Noto Sans JP",
                fontSize: 12,
                color: "#333333",
              }),
            }),
        },
      })}
    />
  ),
};
