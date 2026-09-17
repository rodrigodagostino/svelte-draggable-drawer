<script lang="ts">
	import { getDrawerRootState } from '$lib/states/drawer.svelte.js';
	import type { DrawerContentProps as ContentProps } from '$lib/types/props.js';
	import { applyRubberBand } from '$lib/utils/physics.js';

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

			const startY = rootState.pointerOrigin.y;
			const currentY = rootState.pointer.y;
			const offset = rootState.contentOrigin.y - startY;

			// Calculate where the drawer would be without any resistance.
			const rawY = currentY + offset;

			const TOP_LIMIT = 0 + (rootState.handle?.getBoundingClientRect().height || 48);
			const BOTTOM_LIMIT =
				window.innerHeight - (rootState.handle?.getBoundingClientRect().height || 48);
			let y = rawY;
			const MAX_OVERDRAG = 120;

			if (rawY < TOP_LIMIT) {
				const overdrag = TOP_LIMIT - rawY;
				y = TOP_LIMIT - applyRubberBand(overdrag, MAX_OVERDRAG);
			} else if (rawY > BOTTOM_LIMIT) {
				const overdrag = rawY - BOTTOM_LIMIT;
				y = BOTTOM_LIMIT + applyRubberBand(overdrag, MAX_OVERDRAG);
			}

			return `translate3d(0, ${y}px, 0)`;
		}

		if (rootState.props.isOpen)
			return `translate3d(0, calc(0% + ${rootState.handle?.getBoundingClientRect().height || 48}px), 0)`;

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
