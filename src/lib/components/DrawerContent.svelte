<script lang="ts">
	import { untrack } from 'svelte';
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
		if (rootState.dragState === 'drag') {
			if (!rootState.pointer || !rootState.pointerOrigin || !rootState.contentOrigin) return 'none';

			const startY = rootState.pointerOrigin.y;
			const currentY = rootState.pointer.y;
			const offset = rootState.contentOrigin.y - startY;

			// Calculate where the drawer would be without any resistance.
			const rawY = currentY + offset;

			const START_LIMIT =
				window.innerHeight - toPixels(rootState.props.range?.start, RANGE_START_DEFAULT);
			const END_LIMIT = 0 + toPixels(rootState.props.range?.end, RANGE_END_DEFAULT);
			let y = rawY;
			const MAX_OVERDRAG = 120;

			if (rawY < END_LIMIT) {
				const overdrag = END_LIMIT - rawY;
				y = END_LIMIT - applyRubberBand(overdrag, MAX_OVERDRAG);
			} else if (rawY > START_LIMIT) {
				const overdrag = rawY - START_LIMIT;
				y = START_LIMIT + applyRubberBand(overdrag, MAX_OVERDRAG);
			}

			return `translate3d(0, ${y}px, 0)`;
		}

		if (rootState.activeSnapPoint !== null) {
			return `translate3d(0, calc(100% - ${toCSSLength(rootState.props.snapPoints![rootState.activeSnapPoint.index])}), 0)`;
		}

		return rootState.props.isOpen
			? `translate3d(0, calc(0% + ${toCSSLength(rootState.props.range?.end ?? RANGE_END_DEFAULT)}), 0)`
			: `translate3d(0, calc(100% - ${toCSSLength(rootState.props.range?.start ?? RANGE_START_DEFAULT)}), 0)`;
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
	style:transform={styleTransform}
	style:transition={styleTransition}
>
	{@render children?.()}
</div>

<style>
	.sdd-content {
		display: flex;
		flex-direction: column;
		width: calc(100% - 2rem);
		height: 100%;
		margin-inline: auto;
		pointer-events: auto;
		position: relative;
		z-index: 1;
	}

	@media (min-width: 48em) {
		.sdd-content {
			width: calc(100% - 2.5rem);
		}
	}
</style>
