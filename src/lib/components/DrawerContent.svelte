<script lang="ts">
	import { getDrawerRootState } from '$lib/states/drawer.svelte.js';
	import type { DrawerContentProps as ContentProps } from '$lib/types/props.js';

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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function getStyleTransform(...args: unknown[]) {
		if (rootState.dragState === 'drag') {
			if (!rootState.pointer || !rootState.pointerOrigin || !rootState.contentOrigin) return 'none';
			// Prevent the drawer from being dragged above the top of the screen or below the bottom.
			const y =
				rootState.pointerOrigin.y > window.innerHeight / 2
					? rootState.pointer.y > rootState.pointerOrigin.y
						? rootState.pointerOrigin.y
						: rootState.pointer.y
					: rootState.pointer.y < rootState.pointerOrigin.y
						? rootState.pointerOrigin.y
						: rootState.pointer.y;
			// Set the position of the content relative to the pointer.
			const offset = rootState.contentOrigin.y - rootState.pointerOrigin.y;

			return `translate3d(0, ${y + offset}px, 0)`;
		}

		if (rootState.props.isOpen)
			return `translate3d(0, calc(0% + ${rootState.handle?.getBoundingClientRect().height || 24}px), 0)`;

		return `translate3d(0, calc(100% - ${rootState.handle?.getBoundingClientRect().height || 48}px), 0)`;
	}

	const styleTransform = $derived(
		getStyleTransform(rootState.pointer, rootState.dragState, rootState.props.isOpen)
	);
	const styleTransition = $derived(
		rootState.dragState !== 'drag-start' && rootState.dragState !== 'drag'
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
