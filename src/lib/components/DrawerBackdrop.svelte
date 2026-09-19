<script lang="ts">
	import { untrack } from 'svelte';
	import { RANGE_END_DEFAULT, RANGE_START_DEFAULT } from '$lib/constants/index.js';
	import { getDrawerRootState } from '$lib/states/drawer.svelte.js';
	import type { DrawerBackdropProps as BackdropProps } from '$lib/types/props.js';
	import { toPixels } from '$lib/utils/index.js';

	let { ref = $bindable(null), ...restProps }: BackdropProps & { class?: string } = $props();

	let offsetHeight: number = $state(0);

	const rootState = getDrawerRootState();

	const classes = $derived(['sdd-backdrop', restProps.class]);

	function getStyleOpacity() {
		if (rootState.dragState.startsWith('drag') && rootState.pointer) {
			const handleRect = rootState.handle?.getBoundingClientRect();
			if (!handleRect) return 0;

			const rangeStart = toPixels(rootState.props.range?.start, RANGE_START_DEFAULT);
			const rangeEnd = toPixels(rootState.props.range?.end, RANGE_END_DEFAULT);
			const windowHeightWithoutRange = window.innerHeight - rangeEnd - rangeStart;
			const handleTop = Math.min(
				Math.max((handleRect.top ?? 0) - rangeEnd, 0),
				window.innerHeight - rangeStart
			);
			const opacity = (handleTop / windowHeightWithoutRange / 2 - 0.5) * -1;

			return Math.max(Math.min(opacity, 0.5), 0);
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
		rootState.props.isOpen = false;
	};
</script>

<div
	bind:this={ref}
	bind:offsetHeight
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
