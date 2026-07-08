<script lang="ts">
	import { getDrawerRootState } from '$lib/states/drawer.svelte.js';
	import type { DrawerBackdropProps as BackdropProps } from '$lib/types/props.js';

	let { ref = $bindable(null), ...restProps }: BackdropProps & { class?: string } = $props();

	let offsetHeight: number = $state(0);

	const rootState = getDrawerRootState();

	const classes = $derived(['sdd-backdrop', restProps.class]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function getStyleOpacity(...args: unknown[]) {
		if (rootState.dragState === 'drag' && rootState.pointer) {
			return (rootState.pointer.y / offsetHeight / 2 - 0.5) * -1;
		}
		if (rootState.props.isOpen) return 0.5;
		return 0;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function getStyleTransition(...args: unknown[]) {
		if (rootState.dragState !== 'drag-start' && rootState.dragState !== 'drag')
			return 'opacity 240ms';
		return 'none';
	}

	const styleOpacity = $derived(
		getStyleOpacity(rootState.pointer, rootState.dragState, rootState.props.isOpen)
	);
	const styleTransition = $derived(getStyleTransition(rootState.dragState));

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
