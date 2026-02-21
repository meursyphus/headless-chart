import type { BoxPlotChartCustom } from '../types';
import {
	Axis,
	Container,
	CrossAxisAlignment,
	Flex,
	MainAxisAlignment,
} from '@meursyphus/flitter';

export function BoxPlotGroup(
	...[{ boxPlots }]: Parameters<BoxPlotChartCustom['boxPlotGroup']>
) {
	return Container({
		width: Infinity,
		height: Infinity,
		child: Flex({
			mainAxisAlignment: MainAxisAlignment.center,
			crossAxisAlignment: CrossAxisAlignment.end,
			direction: Axis.horizontal,
			children: boxPlots,
		})
	});
}
