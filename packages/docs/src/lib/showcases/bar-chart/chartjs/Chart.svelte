<script lang="ts">
	import Widget from '@meursyphus/flitter-svelte';
	import { BarChart, type BarChartCustom } from '@meursyphus/headless-chart';
	import {
		Text,
		Border,
		BorderSide,
		BoxDecoration,
		Column,
		Container,
		EdgeInsets,
		Row,
		SizedBox,
		TextStyle,
		Padding,
		MainAxisSize,
		MainAxisAlignment,
		Flexible,
		Stack,
		Positioned
	} from '@meursyphus/flitter';
	const data = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				legend: 'My First Dataset',
				values: [65, 59, 80, 81, 56, 55, 40]
			}
		]
	};
	const backgroundColors = [
		'rgba(255, 99, 132, 0.2)',
		'rgba(255, 159, 64, 0.2)',
		'rgba(255, 205, 86, 0.2)',
		'rgba(75, 192, 192, 0.2)',
		'rgba(54, 162, 235, 0.2)',
		'rgba(153, 102, 255, 0.2)',
		'rgba(201, 203, 207, 0.2)'
	];
	const borderColors = [
		'rgb(255, 99, 132)',
		'rgb(255, 159, 64)',
		'rgb(255, 205, 86)',
		'rgb(75, 192, 192)',
		'rgb(54, 162, 235)',
		'rgb(153, 102, 255)',
		'rgb(201, 203, 207)'
	];

	function Layout(...[{ legends, plot, title }]: Parameters<BarChartCustom['layout']>) {
		return Container({
			padding: EdgeInsets.only({ left: 30, bottom: 70 }),
			child: Stack({
				children: [
					Positioned({
						top: 0,
						right: 0,
						child: Text('chartjs 따라하기', {
							style: new TextStyle({
								fontSize: 14,
								color: '#999999',
								fontFamily: 'Noto Sans JP'
							})
						})
					}),
					Column({
						children: [
							Row({
								mainAxisAlignment: MainAxisAlignment.center,
								children: [...legends, SizedBox({ width: 30 })]
							}),
							SizedBox({ height: 5 }),
							plot
						]
					})
				]
			})
		});
	}
	function XAxisLabel(...[{ name }]: Parameters<BarChartCustom['xAxisLabel']>) {
		return Padding({
			padding: EdgeInsets.only({ top: 1 }),
			child: Text(name, {
				style: new TextStyle({
					fontFamily: 'Noto Sans JP',
					fontSize: 12,
					color: '#666666'
				})
			})
		});
	}
	function YAxisLabel(...[{ name }]: Parameters<BarChartCustom['yAxisLabel']>) {
		return Padding({
			padding: EdgeInsets.only({ right: 1 }),
			child: Text(name, {
				style: new TextStyle({
					fontFamily: 'Noto Sans JP',
					fontSize: 12,
					color: '#666666'
				})
			})
		});
	}
	function XAxisTick(...[,]: Parameters<BarChartCustom['xAxisTick']>) {
		return Container({
			height: 6,
			width: 1,
			color: '#DDDDDD'
		});
	}
	function YAxisTick(...[,]: Parameters<BarChartCustom['yAxisTick']>) {
		return Container({
			height: 1,
			width: 6,
			color: '#DDDDDD'
		});
	}
	function YAxisLine(...[,]: Parameters<BarChartCustom['yAxisLine']>) {
		return Container({
			color: '#BBBBBB',
			width: 1,
			height: Infinity
		});
	}
	function xAxisLine(...[,]: Parameters<BarChartCustom['xAxisLine']>) {
		return Container({
			color: '#BBBBBB',
			height: 1,
			width: Infinity
		});
	}
	function Series(
		...[
			{ barGroups },
			{
				scale,
				data: { labels }
			}
		]: Parameters<BarChartCustom['series']>
	) {
		const count = (scale.max - scale.min) / scale.step;
		return Stack({
			children: [
				Row({
					mainAxisAlignment: MainAxisAlignment.spaceBetween,
					children: [
						...Array.from({ length: labels.length + 1 }, (_, index) =>
							Container({
								width: 1,
								color: index !== 0 ? '#DDDDDD' : 'transparent'
							})
						)
					]
				}),
				Column({
					mainAxisAlignment: MainAxisAlignment.spaceBetween,
					children: [
						...Array.from({ length: count + 1 }, (_, index) =>
							Container({
								height: 1,
								color: index !== count ? '#DDDDDD' : 'transparent'
							})
						)
					]
				}),
				Row({
					children: barGroups.map((barGroup) => Flexible({ flex: 1, child: barGroup }))
				})
			]
		});
	}
	function Legend(...[{ name }]: Parameters<BarChartCustom['legend']>) {
		return Row({
			mainAxisAlignment: MainAxisAlignment.center,
			mainAxisSize: MainAxisSize.min,
			children: [
				Container({
					width: 36,
					height: 12,
					decoration: new BoxDecoration({
						color: 'rgba(255, 99, 132, 0.2)',
						border: Border.all({ color: 'rgb(255, 99, 132)' })
					})
				}),
				SizedBox({ width: 5 }),
				Text(name, {
					style: new TextStyle({ fontFamily: 'Noto Sans JP', fontSize: 14, color: '#666666' })
				})
			]
		});
	}
	function Bar(...[{ label }]: Parameters<BarChartCustom['bar']>) {
		const index = data.labels.indexOf(label);
		const backgroundColor = backgroundColors[index];
		const borderSide = new BorderSide({
			color: borderColors[index],
			width: 1
		});
		return Container({
			width: Infinity,
			margin: EdgeInsets.symmetric({ horizontal: 8 }),
			height: Infinity,
			decoration: new BoxDecoration({
				color: backgroundColor,
				border: new Border({
					left: borderSide,
					right: borderSide,
					top: borderSide
				})
			})
		});
	}
</script>

<Widget
	width="470px"
	height="252px"
	widget={BarChart({
		data,
		custom: {
			layout: Layout,
			bar: Bar,
			xAxisLabel: XAxisLabel,
			yAxisLabel: YAxisLabel,
			yAxisTick: YAxisTick,
			xAxisTick: XAxisTick,
			legend: Legend,
			xAxisLine: xAxisLine,
			yAxisLine: YAxisLine,
			series: Series
		}
	})}
/>
