import type { BarChartCustom } from '../types';
import {
	Column,
	MainAxisAlignment,
	MainAxisSize,
	Offset,
	Row,
	Transform
} from '@meursyphus/flitter';
import { IgnoreSize } from '$lib/utils';

export function XAxis({ labels, tick, line }: Parameters<BarChartCustom['xAxis']>[0]) {
	return Column({
		mainAxisSize: MainAxisSize.min,
		children: [
			line,
			Row({
				mainAxisAlignment: MainAxisAlignment.spaceBetween,
				children: Array.from({ length: labels.length + 1 }, (_, index) =>
					Transform.translate({
						offset: new Offset({ x: index === 0 ? -1 : 0, y: 0 }),
						child: tick
					})
				)
			}),
			Row({
				mainAxisAlignment: MainAxisAlignment.spaceAround,
				children: labels.map((child) => IgnoreSize({ child, ignoreWidth: true }))
			})
		]
	});
}
