import type { BarChartCustom } from '../types';
import {
	Column,
	FractionalTranslation,
	MainAxisAlignment,
	MainAxisSize,
	Offset,
	Row
} from '@meursyphus/flitter';
import { IgnoreSize } from '$lib/utils';

export function XAxis(
	...[{ labels, tick, line }, { direction }]: Parameters<BarChartCustom['xAxis']>
) {
	return Column({
		mainAxisSize: MainAxisSize.min,
		children: [
			line,
			Row({
				mainAxisAlignment: MainAxisAlignment.spaceBetween,
				children: Array.from(
					{ length: labels.length + (direction === 'vertical' ? 1 : 0) },
					(_, index) =>
						FractionalTranslation({
							translation: new Offset({ x: index === 0 ? -1 : 0, y: 0 }),
							child: tick
						})
				)
			}),
			Row({
				mainAxisAlignment:
					direction === 'vertical' ? MainAxisAlignment.spaceAround : MainAxisAlignment.spaceBetween,
				children: labels.map((child) => IgnoreSize({ child, ignoreWidth: true }))
			})
		]
	});
}
