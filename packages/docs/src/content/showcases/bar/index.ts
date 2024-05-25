import Chartjs from "./chartjs";
import Highchart from "./highchart";
import Nivo from "./nivo";

const bar = {
  [Chartjs.basic.key]: {
    widget: Chartjs.basic.widget,
  },
  [Highchart.basic.key]: {
    widget: Highchart.basic.widget,
  },
  [Nivo.basic.key]: {
    widget: Nivo.basic.widget,
  },
} as const;

export default bar;
