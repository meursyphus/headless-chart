export interface ChartInfo {
  title: string;
  slug: string;
  description: string;
  category: "cartesian" | "radial" | "statistical" | "hierarchical" | "flow" | "financial";
  gradient: string;
}

export const charts: ChartInfo[] = [
  {
    title: "Bar Chart",
    slug: "bar-chart",
    description:
      "Compare values across categories with vertical or horizontal bars.",
    category: "cartesian",
    gradient: "from-blue-100 to-cyan-100",
  },
  {
    title: "Line Chart",
    slug: "line-chart",
    description: "Visualize trends over time with connected data points.",
    category: "cartesian",
    gradient: "from-violet-100 to-purple-100",
  },
  {
    title: "Area Chart",
    slug: "area-chart",
    description:
      "Show trends with filled regions beneath the line for emphasis.",
    category: "cartesian",
    gradient: "from-emerald-100 to-teal-100",
  },
  {
    title: "Pie Chart",
    slug: "pie-chart",
    description: "Display proportional data as slices of a circular chart.",
    category: "radial",
    gradient: "from-amber-100 to-yellow-100",
  },
  {
    title: "Scatter Chart",
    slug: "scatter-chart",
    description:
      "Plot individual data points to reveal correlations between variables.",
    category: "cartesian",
    gradient: "from-rose-100 to-pink-100",
  },
  {
    title: "Bubble Chart",
    slug: "bubble-chart",
    description:
      "Extend scatter plots with a third dimension represented by bubble size.",
    category: "cartesian",
    gradient: "from-sky-100 to-blue-100",
  },
  {
    title: "Radar Chart",
    slug: "radar-chart",
    description:
      "Compare multiple variables on a radial grid for multivariate analysis.",
    category: "radial",
    gradient: "from-indigo-100 to-violet-100",
  },
  {
    title: "Heatmap Chart",
    slug: "heatmap-chart",
    description:
      "Visualize matrix data using color intensity to represent values.",
    category: "cartesian",
    gradient: "from-orange-100 to-amber-100",
  },
  {
    title: "Treemap Chart",
    slug: "treemap-chart",
    description:
      "Display hierarchical data as nested rectangles sized by value.",
    category: "hierarchical",
    gradient: "from-lime-100 to-green-100",
  },
  {
    title: "Candlestick Chart",
    slug: "candlestick-chart",
    description:
      "Show financial OHLC data with traditional candlestick visualization.",
    category: "financial",
    gradient: "from-red-100 to-rose-100",
  },
  {
    title: "Gauge Chart",
    slug: "gauge-chart",
    description:
      "Display a single value within a range using a dial indicator.",
    category: "radial",
    gradient: "from-teal-100 to-cyan-100",
  },
  {
    title: "Funnel Chart",
    slug: "funnel-chart",
    description:
      "Visualize stages in a process showing progressive reduction.",
    category: "flow",
    gradient: "from-fuchsia-100 to-pink-100",
  },
  {
    title: "Sankey Chart",
    slug: "sankey-chart",
    description: "Show flow quantities between nodes with proportional links.",
    category: "flow",
    gradient: "from-cyan-100 to-sky-100",
  },
  {
    title: "Sunburst Chart",
    slug: "sunburst-chart",
    description:
      "Display hierarchical data in concentric rings radiating outward.",
    category: "hierarchical",
    gradient: "from-yellow-100 to-orange-100",
  },
  {
    title: "Box Plot Chart",
    slug: "box-plot-chart",
    description:
      "Show statistical distribution with quartiles, median, and outliers.",
    category: "statistical",
    gradient: "from-purple-100 to-indigo-100",
  },
  {
    title: "Waterfall Chart",
    slug: "waterfall-chart",
    description:
      "Illustrate cumulative effects of sequential positive and negative values.",
    category: "financial",
    gradient: "from-green-100 to-emerald-100",
  },
  {
    title: "Stacked Bar Chart",
    slug: "stacked-bar-chart",
    description:
      "Compare totals and their composition across categories with stacked segments.",
    category: "cartesian",
    gradient: "from-pink-100 to-rose-100",
  },
  {
    title: "Stacked Area Chart",
    slug: "stacked-area-chart",
    description:
      "Show how multiple series contribute to a total over time.",
    category: "cartesian",
    gradient: "from-blue-100 to-indigo-100",
  },
];
