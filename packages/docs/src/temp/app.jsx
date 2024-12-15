import Widget from "@meursyphus/flitter-react";
import { PieChart } from "@meursyphus/headless-chart";
import {
  Text,
  Container,
  EdgeInsets,
  Row,
  Stack,
  Positioned,
  SizedBox,
  TextStyle,
} from "@meursyphus/flitter";


const data = {
  labels: ["Red", "Blue", "Green", "Yellow"],
  datasets: [
    { legend: "Red", color: "#FF0000", values: [40] },
    { legend: "Blue", color: "#0000FF", values: [30] },
    { legend: "Green", color: "#00FF00", values: [20] },
    { legend: "Yellow", color: "#FFFF00", values: [10] },
  ],
};

console.log("Initial Data:", data);


const chart = PieChart({
  data,
  getScale: () => {
    const total = data.datasets.reduce(
      (sum, dataset) => sum + dataset.values[0],
      0
    );
    console.log("Scale Total:", total);
    return { total };
  },
  custom: {
    
    layout: ({ title, legends, plot }) => {
      console.log("Layout Inputs - Title:", title);
      console.log("Layout Inputs - Legends:", legends);
      console.log("Layout Inputs - Plot:", plot);

      return Container({
        padding: EdgeInsets.all(20),
        child: Stack({
          children: [
            Positioned({
              top: 0,
              left: 0,
              child: title || Text("Pie Chart Example", {
                style: new TextStyle({
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: "bold",
                }),
              }),
            }),
            Row({
              children: [
                SizedBox({ width: 20 }),
                plot || Text("No plot available"),
                ...(legends?.map((legend) => legend) || [
                  Text("No legends available"),
                ]),
              ],
            }),
          ],
        }),
      });
    },
    
    segments: ({ arcs }) => {
      console.log("Segments - Arcs Input:", arcs);

      if (!arcs || arcs.length === 0) {
        console.warn("No arcs data provided.");
        return Text("No segments available");
      }

      return Stack({
        children: arcs.map((arc, index) =>
          Segment({
            startAngle: arc.startAngle,
            endAngle: arc.endAngle,
            color: arc.color || "#CCCCCC",
            legend: arc.legend || `Segment ${index + 1}`,
          })
        ),
      });
    },
    
    legend: ({ name, index }) => {
      console.log("Legend - Name:", name, "Index:", index);
      return Text({
        text: `${index + 1}. ${name || "Unnamed"}`,
        style: new TextStyle({
          fontSize: 12,
          color: "#666666",
        }),
      });
    },
    plot: ({ segments, grid }) => {
      console.log("Plot - Segments:", segments, "Grid:", grid);

      return Stack({
        children: [
          segments || Text("No segments available"),
          grid || Text("No grid available"),
        ],
      });
    },
    grid: () => {
      console.log("Grid Placeholder Rendered");
      return Text({
        text: "Grid Placeholder",
        style: new TextStyle({ fontSize: 12, color: "#AAAAAA" }),
      });
    },
  },
});

function Segment({ startAngle, endAngle, color, legend }) {
  console.log("Segment Inputs - Start Angle:", startAngle);
  console.log("Segment Inputs - End Angle:", endAngle);
  console.log("Segment Inputs - Color:", color);
  console.log("Segment Inputs - Legend:", legend);

  const radius = 100;

  return Container({
    width: radius,
    height: radius,
    color: color,
    child: Text({
      text: legend,
      style: new TextStyle({
        fontSize: 10,
        color: "#FFFFFF",
        fontWeight: "bold",
      }),
    }),
  });
}


export default function App() {
  console.log("Rendering PieChart App...");
  return <Widget width="400px" height="400px" widget={chart} renderer="svg" />;
}
