import { Provider, BuildContext, Widget } from "@meursyphus/flitter";
import { ScatterChartConfig } from "./types";

const SCATTER_CHART_CONTEXT_KEY = Symbol("ScatterChartKey");

export function ScatterChartConfigProvider({
  child,
  value,
}: {
  child: Widget;
  value: ScatterChartConfig;
}): Widget {
  return Provider({
    child,
    providerKey: SCATTER_CHART_CONTEXT_KEY,
    value,
  });
}

ScatterChartConfigProvider.of = (context: BuildContext): ScatterChartConfig => {
  return Provider.of(SCATTER_CHART_CONTEXT_KEY, context);
};
