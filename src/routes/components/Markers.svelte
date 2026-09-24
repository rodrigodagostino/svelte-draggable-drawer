<script lang="ts">
	import { fade } from 'svelte/transition';
	import layoutState from '../states.svelte.js';
	import { toPixels } from '$lib/utils/index.js';
	import {
		RANGE_END_DEFAULT,
		RANGE_START_DEFAULT,
		SNAP_POINT_OFFSET,
	} from '$lib/constants/index.js';
</script>

<div class="markers">
	{#each layoutState.props.snapPoints as snapPoint, index (index)}
		<div
			class="marker marker--snap-point-offset-top"
			style:bottom="{toPixels(snapPoint, 0) - SNAP_POINT_OFFSET}px"
			transition:fade|global={{ duration: 200 }}
		>
			<span class="marker__text">{SNAP_POINT_OFFSET}</span>
		</div>
		<div
			class="marker marker--snap-point-offset-bottom"
			style:bottom="{toPixels(snapPoint, 0) + SNAP_POINT_OFFSET}px"
			transition:fade|global={{ duration: 200 }}
		>
			<span class="marker__text">{SNAP_POINT_OFFSET}</span>
		</div>
	{/each}
	{#each layoutState.props.snapPoints as snapPoint, index (index)}
		<div
			class="marker marker--snap-point"
			style:bottom="{toPixels(snapPoint, 0)}px"
			transition:fade|global={{ duration: 200 }}
		>
			<span class="marker__text">snap point {index}: {snapPoint}</span>
		</div>
	{/each}
	<div
		class="marker marker--range-start"
		style:bottom="{toPixels(layoutState.props.range?.start, RANGE_START_DEFAULT)}px"
		transition:fade|global={{ duration: 200 }}
	>
		<span class="marker__text">range start: {layoutState.props.range?.start}</span>
	</div>
	<div
		class="marker marker--range-end"
		style:bottom="calc(100% - {toPixels(layoutState.props.range?.end, RANGE_END_DEFAULT)}px)"
		transition:fade|global={{ duration: 200 }}
	>
		<span class="marker__text">range end: {layoutState.props.range?.end}</span>
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
