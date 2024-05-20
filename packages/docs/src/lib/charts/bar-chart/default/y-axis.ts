import type { BarChartCustom } from '../types';
import {
	Column,
	Container,
	CrossAxisAlignment,
	MainAxisAlignment,
	MainAxisSize,
	Offset,
	Row,
	Transform,
	VerticalDirection
} from '@meursyphus/flitter';
import { IgnoreSize } from '$lib/utils';

export function YAxis({ labels, tick }: Parameters<BarChartCustom['yAxis']>[0]) {
	return Row({
		mainAxisSize: MainAxisSize.min,
		children: [
			Column({
				verticalDirection: VerticalDirection.up,
				mainAxisAlignment: MainAxisAlignment.spaceBetween,
				crossAxisAlignment: CrossAxisAlignment.end,
				children: labels.map((label, index) =>
					Transform.translate({
						offset: new Offset({ x: 0, y: index === labels.length - 1 ? 0 : 1 }),
						child: Row({
							mainAxisSize: MainAxisSize.min,
							children: [IgnoreSize({ child: label, ignoreHeight: true }), tick]
						})
					})
				)
			}),
			Container({
				color: 'black',
				width: 1,
				height: Infinity
			})
		]
	});
}
