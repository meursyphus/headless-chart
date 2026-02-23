import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadarChart } from "../charts";
import { ChartWrapper } from "./ChartWrapper";
import { toastColors } from "./toastCustom";
import {
  Text,
  Container,
  EdgeInsets,
  TextStyle,
  Stack,
  StackFit,
  StatefulWidget,
  State,
  AnimationController,
  Tween,
  CurvedAnimation,
  Curves,
  Transform,
  Opacity,
  Alignment,
  CustomPaint,
  Path,
  Center,
  AspectRatio,
  Column,
  CrossAxisAlignment,
  Expanded,
  SizedBox,
  Row,
  BoxDecoration,
  BorderRadius,
  MainAxisAlignment,
  type Widget,
} from "@meursyphus/flitter";

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

// --- Animated dataset widget ---

class AnimatedDataset extends StatefulWidget {
  child: Widget;
  index: number;

  constructor({ child, index }: { child: Widget; index: number }) {
    super();
    this.child = child;
    this.index = index;
  }

  createState(): State<AnimatedDataset> {
    return new AnimatedDatasetState();
  }
}

class AnimatedDatasetState extends State<AnimatedDataset> {
  animationController!: AnimationController;
  scaleAnim!: Tween;
  opacityAnim!: Tween;

  initState(): void {
    super.initState();
    this.animationController = new AnimationController({
      duration: 600,
    });
    this.scaleAnim = new Tween({ begin: 0, end: 1 }).animated(
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
    setTimeout(() => {
      this.animationController.forward();
    }, this.widget.index * 200);
  }

  build() {
    return Opacity({
      opacity: this.opacityAnim.value,
      child: Transform.scale({
        scale: this.scaleAnim.value,
        alignment: Alignment.center,
        child: this.widget.child,
      }),
    });
  }
}

// --- Polygon path helper ---

function createDataPath(
  cx: number,
  cy: number,
  maxRadius: number,
  axisCount: number,
  values: number[],
  maxValue: number
): Path {
  const path = new Path();
  const angleStep = (2 * Math.PI) / axisCount;
  const startAngle = -Math.PI / 2;

  for (let i = 0; i <= axisCount; i++) {
    const idx = i % axisCount;
    const angle = startAngle + idx * angleStep;
    const ratio = Math.min(values[idx] / maxValue, 1);
    const radius = maxRadius * ratio;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    if (i === 0) {
      path.moveTo({ x, y });
    } else {
      path.lineTo({ x, y });
    }
  }

  return path;
}

// --- Custom dataset function ---

function datasetCustom(_args: any, config: any) {
  const { data: chartData, scale } = config;
  const axisCount = chartData.labels.length;
  const datasets = chartData.datasets;

  const layers = datasets.map(
    (ds: { legend: string; values: number[] }, i: number) => {
      const fillColor = toastColors[i % toastColors.length] + "4D";
      const strokeColor = toastColors[i % toastColors.length];

      const paint = CustomPaint({
        painter: {
          svg: {
            createDefaultSvgEl: (context: any) => {
              return {
                fill: context.createSvgEl("path"),
                stroke: context.createSvgEl("path"),
              };
            },
            paint: (
              els: Record<string, SVGElement>,
              { width, height }: { width: number; height: number }
            ) => {
              const cx = width / 2;
              const cy = height / 2;
              const maxRadius = Math.min(cx, cy) * 0.8;
              const path = createDataPath(
                cx,
                cy,
                maxRadius,
                axisCount,
                ds.values,
                scale.max
              );
              const d = path.getD();

              els.fill.setAttribute("d", d);
              els.fill.setAttribute("fill", fillColor);
              els.fill.setAttribute("stroke", "none");

              els.stroke.setAttribute("d", d);
              els.stroke.setAttribute("fill", "none");
              els.stroke.setAttribute("stroke", strokeColor);
              els.stroke.setAttribute("stroke-width", "2");
            },
          },
          canvas: {
            paint: (
              context: any,
              { width, height }: { width: number; height: number }
            ) => {
              const cx = width / 2;
              const cy = height / 2;
              const maxRadius = Math.min(cx, cy) * 0.8;
              const path = createDataPath(
                cx,
                cy,
                maxRadius,
                axisCount,
                ds.values,
                scale.max
              );
              const canvasPath = path.toCanvasPath();

              context.canvas.fillStyle = fillColor;
              context.canvas.fill(canvasPath);

              context.canvas.strokeStyle = strokeColor;
              context.canvas.lineWidth = 2;
              context.canvas.stroke(canvasPath);
            },
          },
        },
      });

      return new AnimatedDataset({ child: paint, index: i });
    }
  );

  return Stack({
    fit: StackFit.expand,
    children: layers,
  });
}

export const Default: StoryObj = {
  render: () => (
    <ChartWrapper
      title="Pokemon Stats"
      description="Inspired by Toast"
      widget={RadarChart({
        data,
        custom: {
          radar: ({ grid, axes, datasets, axisLabels }: any) =>
            Stack({
              fit: StackFit.expand,
              children: [grid, axes, datasets, axisLabels],
            }),
          dataset: datasetCustom,
          layout: ({ radar, legends }: any) =>
            Container({
              padding: EdgeInsets.all(20),
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
                  Expanded({
                    child: Center({
                      child: AspectRatio({
                        aspectRatio: 1,
                        child: radar,
                      }),
                    }),
                  }),
                  SizedBox({ height: 8 }),
                  Row({
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: legends.reduce(
                      (acc: Widget[], legend: Widget, i: number) => {
                        if (i > 0) {
                          acc.push(SizedBox({ width: 16 }));
                        }
                        acc.push(legend);
                        return acc;
                      },
                      [] as Widget[]
                    ),
                  }),
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
                    color: toastColors[index],
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
          axisLabel: ({ label }: any) =>
            Text(label, {
              style: new TextStyle({
                fontFamily: "Noto Sans JP",
                fontSize: 11,
                color: "#666666",
              }),
            }),
        },
      })}
    />
  ),
};
