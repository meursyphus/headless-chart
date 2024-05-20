import type { BarChartCustom } from '../types';
import {
	Column,
	Container,
	CrossAxisAlignment,
	FractionalTranslation,
	MainAxisAlignment,
	MainAxisSize,
	Offset,
	Row,
	VerticalDirection
} from '@meursyphus/flitter';
import { IgnoreSize } from '$lib/utils';

export function YAxis({ labels, tick, line }: Parameters<BarChartCustom['yAxis']>[0]) {
	return Container({
		height: Infinity,
		child: Row({
			mainAxisSize: MainAxisSize.min,
			children: [
				Column({
					verticalDirection: VerticalDirection.up,
					mainAxisAlignment: MainAxisAlignment.spaceBetween,
					crossAxisAlignment: CrossAxisAlignment.end,
					children: labels.map((label, index) =>
						Row({
							mainAxisSize: MainAxisSize.min,
							children: [
								IgnoreSize({ child: label, ignoreHeight: true }),
								FractionalTranslation({
									translation: new Offset({ x: 0, y: index !== 0 ? 0 : 1 }),
									child: tick
								})
							]
						})
					)
				}),
				line
			]
		})
	});
}
