<script lang="ts">
	import { fade } from 'svelte/transition';
	import layoutState from '../states.svelte.js';
	import { toPixels } from '$lib/utils/index.js';
	import {
		RANGE_END_DEFAULT,
		RANGE_START_DEFAULT,
		SNAP_POINT_OFFSET,
	} from '$lib/constants/index.js';

	const rangeStart = $derived(toPixels(layoutState.props.range?.start, RANGE_START_DEFAULT));
	const rangeEnd = $derived(toPixels(layoutState.props.range?.end, RANGE_END_DEFAULT));

	function getMarkerTextTransform(value: number, type: 'snap-point' | 'range-start' | 'range-end') {
		const markerTextHeight = 26;
		const offset = markerTextHeight + markerTextHeight / 2;
		const newValue =
			value < offset && type !== 'range-end'
				? `-${markerTextHeight}px`
				: value < offset && type === 'range-end'
					? 0
					: value > window.innerHeight - offset
						? 0
						: '-50%';
		return `translate(-50%, ${newValue})`;
	}
</script>

<div class="markers">
	{#each layoutState.props.snapPoints as snapPoint, index (index)}
		{@const snapPointInPx = toPixels(snapPoint, 0)}
		<div
			class="marker marker--snap-point-offset-top"
			style:bottom="{snapPointInPx - SNAP_POINT_OFFSET}px"
			transition:fade|global={{ duration: 200 }}
		>
			<span class="marker__text">{SNAP_POINT_OFFSET}</span>
		</div>
		<div
			class="marker marker--snap-point-offset-bottom"
			style:bottom="{snapPointInPx + SNAP_POINT_OFFSET}px"
			transition:fade|global={{ duration: 200 }}
		>
			<span class="marker__text">{SNAP_POINT_OFFSET}</span>
		</div>
	{/each}
	{#each layoutState.props.snapPoints as snapPoint, index (index)}
		{@const snapPointInPx = toPixels(snapPoint, 0)}
		<div
			class="marker marker--snap-point"
			style:bottom="{snapPointInPx}px"
			transition:fade|global={{ duration: 200 }}
		>
			<span
				class="marker__text"
				style:transform={getMarkerTextTransform(snapPointInPx, 'snap-point')}
			>
				snap point {index}: {snapPoint}
			</span>
		</div>
	{/each}
	<div
		class="marker marker--range-start"
		style:bottom="{rangeStart}px"
		transition:fade|global={{ duration: 200 }}
	>
		<span class="marker__text" style:transform={getMarkerTextTransform(rangeStart, 'range-start')}>
			range start: {rangeStart}
		</span>
	</div>
	<div
		class="marker marker--range-end"
		style:bottom="calc(100% - {rangeEnd + 2}px)"
		transition:fade|global={{ duration: 200 }}
	>
		<span class="marker__text" style:transform={getMarkerTextTransform(rangeEnd, 'range-end')}>
			range end: {rangeEnd}
		</span>
	</div>
</div>

<style>
	.markers {
		position: fixed;
		inset: 0;
		pointer-events: none;
		isolation: isolate;
		z-index: 10000;
	}

	.marker {
		position: fixed;
		inset: auto 0;
		border: 1px solid;
		transition:
			top 400ms cubic-bezier(0.32, 0.72, 0, 1),
			bottom 400ms cubic-bezier(0.32, 0.72, 0, 1);
	}

	.marker__text {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 0.1875rem 0.25rem 0.125rem;
		border-radius: 0.125rem;
		transition: transform 400ms;
	}

	.marker--range-start,
	.marker--range-end {
		border-color: crimson;

		& .marker__text {
			background-color: crimson;
			color: white;
		}
	}

	.marker--snap-point {
		border-color: #50c878;

		& .marker__text {
			background-color: #50c878;
		}
	}

	.marker--snap-point-offset-top,
	.marker--snap-point-offset-bottom {
		border-color: #ffbf00;

		& .marker__text {
			font-size: 0.875rem;
			background-color: #ffbf00;
		}

		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 1rem;
			height: 1rem;
			background-color: #ffbf00;
			border-radius: 0.125rem;
		}
	}

	.marker--snap-point-offset-top {
		&::before {
			transform: translate(-50%, -100%) rotate(45deg);
		}
	}

	.marker--snap-point-offset-bottom {
		&::before {
			transform: translate(-50%, 0%) rotate(45deg);
		}
	}
</style>
