import type { BarChartCustom } from '../types';
import { Column, Container, Row } from '@meursyphus/flitter';

export function Layout(...[{ title, legends, plot }]: Parameters<BarChartCustom['layout']>) {
	return Container({
		child: Column({
			children: [
				title,
				plot,
				Row({
					children: legends
				})
			]
		})
	});
}
