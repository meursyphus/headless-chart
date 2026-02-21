import type { WaterfallChartCustom } from '../types';
import { SizedBox } from '@meursyphus/flitter';

export function DataLabel(..._args: Parameters<WaterfallChartCustom['dataLabel']>) {
	return SizedBox.shrink();
}
