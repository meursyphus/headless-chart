import type { BarChartCustom } from '../types';
import {
	Column,
	CrossAxisAlignment,
	FractionalTranslation,
	MainAxisAlignment,
	MainAxisSize,
	Offset,
	Row,
	VerticalDirection
} from '@meursyphus/flitter';
import { IgnoreSize } from '@utils/index';

export function YAxis(
	...[{ labels, tick, line }, { direction }]: Parameters<BarChartCustom['yAxis']>
) {
	const tickCount = labels.length + (direction === 'horizontal' ? 1 : 0);
	return Row({
		mainAxisSize: MainAxisSize.min,
		children: [
			Column({
				crossAxisAlignment: CrossAxisAlignment.end,
				verticalDirection: direction === 'vertical' ? VerticalDirection.up : VerticalDirection.down,
				mainAxisAlignment:
					direction === 'horizontal'
						? MainAxisAlignment.spaceAround
						: MainAxisAlignment.spaceBetween,
				children: labels.map((child) => IgnoreSize({ child, ignoreHeight: true }))
			}),
			Column({
				mainAxisAlignment: MainAxisAlignment.spaceBetween,
				children: Array.from({ length: tickCount }, (_, index) =>
					FractionalTranslation({
						translation: new Offset({
							y: index === tickCount - 1 ? 1 : 0,
							x: 0
						}),
						child: tick
					})
				)
			}),
			line
		]
	});
}
