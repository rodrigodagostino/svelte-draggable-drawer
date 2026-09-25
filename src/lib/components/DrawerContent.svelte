<script lang="ts">
	import { untrack } from 'svelte';
	import { BROWSER } from 'esm-env';
	import { RANGE_END_DEFAULT, RANGE_START_DEFAULT } from '$lib/constants/index.js';
	import { getDrawerRootState } from '$lib/states/drawer.svelte.js';
	import type { DrawerContentProps as ContentProps } from '$lib/types/props.js';
	import { applyRubberBand, toCSSLength, toPixels } from '$lib/utils/index.js';

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: ContentProps & { class?: string } = $props();

	const rootState = getDrawerRootState();

	$effect(() => {
		rootState.content = ref;
	});

	const classes = $derived(['sdd-content', restProps.class]);

	function getStyleTransform() {
		if (!BROWSER) return 'translate3d(0, 100%, 0)';

		const START_LIMIT = toPixels(rootState.props.range?.start, RANGE_START_DEFAULT);
		const END_LIMIT = Math.min(
			rootState.content?.getBoundingClientRect().height ?? 0,
			window.innerHeight - toPixels(rootState.props.range?.end, RANGE_END_DEFAULT)
		);

		if (rootState.dragState === 'drag') {
			if (!rootState.pointer || !rootState.pointerOrigin || !rootState.contentOrigin)
				return 'translate3d(0, 100%, 0)';

			const startY = rootState.pointerOrigin.y;
			const currentY = rootState.pointer.y;
			const offset = rootState.contentOrigin.y - startY;

			// Where the content’s top edge would be without any resistance.
			const rawTopY = currentY + offset;
			// How much of the content that leaves revealed above the bottom edge.
			const rawReveal = window.innerHeight - rawTopY;

			let y = rawReveal;
			const MAX_OVERDRAG = 120;

			if (rawReveal > END_LIMIT) {
				const overdrag = rawReveal - END_LIMIT;
				y = END_LIMIT + applyRubberBand(overdrag, MAX_OVERDRAG);
			} else if (rawReveal < START_LIMIT) {
				const overdrag = START_LIMIT - rawReveal;
				y = START_LIMIT - applyRubberBand(overdrag, MAX_OVERDRAG);
			}

			return `translate3d(0, calc(100% - ${y}px), 0)`;
		}

		if (rootState.activeSnapPoint !== null) {
			const y = Math.min(
				toPixels(rootState.props.snapPoints![rootState.activeSnapPoint.index], 0),
				END_LIMIT
			);
			return `translate3d(0, calc(100% - ${y}px), 0)`;
		}

		return rootState.props.isOpen
			? `translate3d(0, calc(100% - ${END_LIMIT}px), 0)`
			: `translate3d(0, calc(100% - ${START_LIMIT}px), 0)`;
	}

	const styleTransform = $derived.by(() => {
		void rootState.pointer;
		void rootState.dragState;
		void rootState.props.isOpen;
		return untrack(() => getStyleTransform());
	});

	const styleTransition = $derived(
		!rootState.dragState.startsWith('drag')
			? `transform 400ms cubic-bezier(0.32, 0.72, 0, 1)`
			: 'none'
	);
</script>

<div
	bind:this={ref}
	class={classes}
	style:max-height="calc(100% - {toCSSLength(rootState.props.range?.end ?? RANGE_START_DEFAULT)})"
	style:transform={styleTransform}
	style:transition={styleTransition}
	data-drag-state={rootState.dragState}
>
	{@render children?.()}
</div>

<style>
	.sdd-content {
		position: fixed;
		inset: auto 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		width: calc(100% - 2rem);
		margin-inline: auto;
		pointer-events: auto;
		user-select: none;
		z-index: 1;

		&:not(:has(.sdd-content-handle)),
		& :global(.sdd-content-handle) {
			touch-action: none;
			cursor: grab;
		}

		&[data-drag-state*='drag'],
		&[data-drag-state*='drag'] :global(.sdd-content-handle) {
			cursor: grabbing;
		}
	}
</style>
