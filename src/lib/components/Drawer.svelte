<script lang="ts">
	import { setDrawerRootState } from '$lib/states/index.js';
	import type { DrawerRootProps } from '$lib/types/props.js';
	let {
		ref = $bindable(null),
		isOpen = $bindable(false),
		children,
		...restProps
	}: DrawerRootProps & { class?: string } = $props();

	const rootState = setDrawerRootState();

	$effect(() => {
		rootState.props = {
			ref,
			isOpen,
		};
	});

	$effect(() => {
		isOpen = rootState.props.isOpen || false;
	});

	const classes = $derived(['sdd-root', restProps.class]);
	let pointerId: PointerEvent['pointerId'] | null = null;

	const TOP_THRESHOLD = 2 / 5;
	const BOTTOM_THRESHOLD = 3 / 5;

	let transitionTimeoutId: ReturnType<typeof setTimeout> | null = null;

	function handlePointerDown(e: PointerEvent) {
		const target = e.target as HTMLElement;
		if (!rootState.handle || !target.closest('[data-role="handle"]') || !rootState.content) return;

		pointerId = e.pointerId;
		rootState.handle.setPointerCapture(pointerId);
		rootState.pointer = { x: e.clientX, y: e.clientY };
		rootState.pointerOrigin = { x: e.clientX, y: e.clientY };
		rootState.contentOrigin = rootState.content.getBoundingClientRect();
		rootState.dragState = 'drag-start';

		rootState.handle.addEventListener('pointermove', handlePointerMove);
		rootState.handle.addEventListener(
			'pointerup',
			() => {
				rootState.handle?.removeEventListener('pointermove', handlePointerMove);
				handlePointerUp();
			},
			{ once: true }
		);
	}

	async function handlePointerMove({ clientX, clientY }: PointerEvent) {
		if (!rootState.content || !rootState.pointerOrigin) return;

		rootState.dragState = 'drag';

		rootState.pointer = { x: clientX, y: clientY };
		rootState.props.isOpen =
			rootState.pointerOrigin.y > window.innerHeight / 2
				? clientY < window.innerHeight * BOTTOM_THRESHOLD
				: clientY < window.innerHeight * TOP_THRESHOLD;
	}

	function handlePointerUp() {
		if (!rootState.pointerOrigin || !rootState.content) return;

		rootState.dragState = 'drop';

		function handleTransitionEnd({ propertyName }: TransitionEvent) {
			if (propertyName === 'transform') {
				handlePointerAndKeyboardDragEnd();
				rootState.content?.removeEventListener('transitionend', handleTransitionEnd);
				if (transitionTimeoutId) {
					clearTimeout(transitionTimeoutId);
					transitionTimeoutId = null;
				}
			}
		}

		rootState.content?.addEventListener('transitionend', handleTransitionEnd);
		// Ensure the drag operation completes even if `transitionend` doesn’t fire.
		transitionTimeoutId = setTimeout(() => {
			handlePointerAndKeyboardDragEnd();
			rootState.content?.removeEventListener('transitionend', handleTransitionEnd);
			transitionTimeoutId = null;
		}, 400 + 100);
	}

	async function handlePointerAndKeyboardDragEnd() {
		if (pointerId) rootState.content?.releasePointerCapture(pointerId);
		rootState.pointerOrigin = null;
		rootState.contentOrigin = null;
		rootState.dragState = 'idle';
	}
</script>

<div class={classes} data-drag-state={rootState.dragState} onpointerdown={handlePointerDown}>
	{@render children?.()}
</div>

<style>
	.sdd-root {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 9999;

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
