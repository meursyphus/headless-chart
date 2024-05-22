<script lang="ts">
	import SvelteWidget from '@meursyphus/flitter-svelte';
	import { BarChart } from '@meursyphus/headless-chart';

	const data = {
		title: 'Title',
		labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
		datasets: [
			{
				legend: 'A',
				values: [30, 40.5, 50.12, 30.5, 40]
			},
			{
				legend: 'B',
				values: [60, 20.5, 20.2, 22.5, 10]
			},
			{
				legend: 'C',
				values: [6, 10.5, 20.2, 12.5, 1]
			}
		]
	};
</script>

<SvelteWidget
	widget={BarChart({ data, direction: 'vertical', title: 'Vertical' })}
	width="400px"
	height="300px"
/>
<SvelteWidget
	widget={BarChart({ data, direction: 'horizontal', title: 'Horizontal' })}
	width="400px"
	height="300px"
/>
