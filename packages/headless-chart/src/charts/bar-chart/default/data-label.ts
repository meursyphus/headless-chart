import type { BarChartCustom } from '../types';
import { SizedBox } from '@meursyphus/flitter';

export function DataLabel(config: Parameters<BarChartCustom['dataLabel']>[0]) {
	return SizedBox.shrink();
}
