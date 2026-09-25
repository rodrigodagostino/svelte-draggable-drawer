<script lang="ts">
	import { untrack } from 'svelte';
	import { RANGE_END_DEFAULT, RANGE_START_DEFAULT } from '$lib/constants/index.js';
	import { getDrawerRootState } from '$lib/states/drawer.svelte.js';
	import type { DrawerBackdropProps as BackdropProps } from '$lib/types/props.js';
	import { clamp, toPixels } from '$lib/utils/index.js';

	let { ref = $bindable(null), ...restProps }: BackdropProps & { class?: string } = $props();

	const rootState = getDrawerRootState();

	const classes = $derived(['sdd-backdrop', restProps.class]);

	function getStyleOpacity() {
		if (rootState.dragState.startsWith('drag') && rootState.pointer) {
			const draggedTop =
				rootState.handle?.getBoundingClientRect().top ??
				rootState.content?.getBoundingClientRect().top ??
				rootState.pointer.y;
			const currentReveal = window.innerHeight - draggedTop;

			const rangeStart = toPixels(rootState.props.range?.start, RANGE_START_DEFAULT);
			const rangeEnd = toPixels(rootState.props.range?.end, RANGE_END_DEFAULT);
			const contentHeight = rootState.content?.offsetHeight ?? 0;
			// Reveal amount at “fully open”, which is capped to the content’s own height,
			// since it may no longer span the full viewport.
			const openLimit = Math.min(contentHeight, window.innerHeight - rangeEnd);
			// Treat the first (smallest) snap point as the “open” reference for opacity.
			const openReveal = rootState.props.snapPoints?.length
				? Math.min(toPixels(rootState.props.snapPoints[0], RANGE_END_DEFAULT), openLimit)
				: openLimit;

			const availableHeight = openReveal - rangeStart;
			const handleOffset = clamp(currentReveal - rangeStart, 0, availableHeight);
			const openProgress = handleOffset / availableHeight;

			return clamp(openProgress / 2, 0, 0.5);
		}

		return rootState.props.isOpen ? 0.5 : 0;
	}

	function getStyleTransition() {
		if (!rootState.dragState.startsWith('drag')) return 'opacity 240ms';
		return 'none';
	}

	const styleOpacity = $derived.by(() => {
		void rootState.pointer;
		void rootState.dragState;
		void rootState.props.isOpen;
		return untrack(() => getStyleOpacity());
	});

	const styleTransition = $derived.by(() => {
		void rootState.dragState;
		return untrack(() => getStyleTransition());
	});

	const handleClick = () => {
		rootState.activeSnapPoint = null;
		rootState.props.isOpen = false;
	};
</script>

<div
	bind:this={ref}
	class={classes}
	style:opacity={styleOpacity}
	style:transition={styleTransition}
	style:pointer-events={rootState.props.isOpen ? 'auto' : 'none'}
	aria-hidden="true"
	onclick={handleClick}
></div>

<style>
	.sdd-backdrop {
		position: fixed;
		inset: 0;
		z-index: 0;
	}
</style>
