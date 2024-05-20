import type { BarChartCustom } from '../types';
import { Container } from '@meursyphus/flitter';

export function XAxisTick(_: Parameters<BarChartCustom['xAxisTick']>[0]) {
	return Container({
		width: 1,
		height: 4,
		color: 'black'
	});
}
