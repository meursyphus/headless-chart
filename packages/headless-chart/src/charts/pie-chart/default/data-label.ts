import type { PieChartCustom } from '../types';
import { SizedBox, type Widget } from '@meursyphus/flitter';

export function DataLabel(...[_args]: Parameters<PieChartCustom['dataLabel']>): Widget {
	return SizedBox.shrink();
}
