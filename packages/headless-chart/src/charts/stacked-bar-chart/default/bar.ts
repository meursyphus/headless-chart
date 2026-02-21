import type { StackedBarChartCustom } from '../types';
import { Container } from '@meursyphus/flitter';

export function Bar(...[_, { direction }]: Parameters<StackedBarChartCustom['bar']>) {
	return Container({
		width: direction === 'vertical' ? Infinity : undefined,
		height: direction === 'horizontal' ? Infinity : undefined,
		color: 'black'
	});
}
