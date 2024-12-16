import { type Widget, Provider, BuildContext } from "@meursyphus/flitter";
import { TreeMapChartConfig } from "./types";

const TREE_MAP_CHART_CONTEXT_KEY = Symbol("TreeMapChartKey");

export function TreeMapChartConfigProvider({
  child,
  value,
}: {
  child: Widget;
  value: TreeMapChartConfig;
}): Widget {
  return Provider({
    child,
    providerKey: TREE_MAP_CHART_CONTEXT_KEY,
    value,
  });
}

TreeMapChartConfigProvider.of = (context: BuildContext): TreeMapChartConfig => {
  return Provider.of(TREE_MAP_CHART_CONTEXT_KEY, context);
};
