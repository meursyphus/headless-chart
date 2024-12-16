import { type Widget, Provider, BuildContext } from "@meursyphus/flitter";

const TREE_MAP_CHART_CONTEXT_KEY = Symbol("TreeMapChartKey");

export function TreeMapChartConfigProvider({
  child,
  value,
}: {
  child: Widget;
  value: any;
}): Widget {
  return Provider({
    child,
    providerKey: TREE_MAP_CHART_CONTEXT_KEY,
    value,
  });
}

TreeMapChartConfigProvider.of = (context: BuildContext) => {
  return Provider.of(TREE_MAP_CHART_CONTEXT_KEY, context);
};
