import { Provider, BuildContext, Widget } from "@meursyphus/flitter";
import { PieChartConfig } from "./types";

const PIE_CHART_CONTEXT_KEY = Symbol("PieChartKey");

export function PieChartConfigProvider({
  child,
  value,
}: {
  child: Widget;
  value: PieChartConfig;
}): Widget {
  return Provider({
    child,
    providerKey: PIE_CHART_CONTEXT_KEY,
    value,
  });
}
