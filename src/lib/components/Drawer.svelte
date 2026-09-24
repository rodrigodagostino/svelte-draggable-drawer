<script lang="ts">
	import {
		RANGE_END_DEFAULT,
		RANGE_START_DEFAULT,
		SNAP_POINT_OFFSET,
	} from '$lib/constants/index.js';
	import { setDrawerRootState } from '$lib/states/index.js';
	import type { DrawerRootProps } from '$lib/types/props.js';
	import { toPixels } from '$lib/utils/index.js';

	let {
		ref = $bindable(null),
		range = { start: RANGE_START_DEFAULT, end: RANGE_END_DEFAULT },
		snapPoints = [],
		activeSnapPoint = $bindable(null),
		isOpen = $bindable(false),
		children,
		...restProps
	}: DrawerRootProps & { class?: string } = $props();

	const rootState = setDrawerRootState();

	$effect(() => {
		rootState.props = {
			ref,
			range,
			snapPoints: snapPoints.sort((a, b) => toPixels(a, 0) - toPixels(b, 0)),
			activeSnapPoint,
			isOpen,
		};
	});

	$effect(() => {
		activeSnapPoint = rootState.activeSnapPoint ?? null;
		isOpen = rootState.props.isOpen || false;
	});

	const classes = $derived(['sdd-root', restProps.class]);
	let pointerId: PointerEvent['pointerId'] | null = null;

	const START_THRESHOLD = 2 / 5;
	const END_THRESHOLD = 2 / 5;

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
		const handleTop = rootState.handle?.getBoundingClientRect()?.top ?? clientY;
		const visibleHeight = window.innerHeight - handleTop;
		const snapPoints = rootState.props.snapPoints ?? [];
		const snapPointsInPx = (snapPoints ?? []).map((point) => toPixels(point, 0));

		if (snapPointsInPx.length) {
			const isBelowFirst = visibleHeight <= snapPointsInPx[0] - SNAP_POINT_OFFSET;
			const isAboveLast = visibleHeight >= snapPointsInPx.at(-1)! + SNAP_POINT_OFFSET;

			if (isBelowFirst || isAboveLast) {
				rootState.activeSnapPoint = null;
			} else {
				const index = snapPointsInPx.findIndex(
					(point) => Math.abs(visibleHeight - point) <= SNAP_POINT_OFFSET
				);
				if (index !== -1) rootState.activeSnapPoint = { index, value: snapPoints[index] };
			}

			rootState.props.isOpen = !isBelowFirst;
		} else {
			const threshold =
				rootState.pointerOrigin.y > window.innerHeight / 2 ? START_THRESHOLD : END_THRESHOLD;
			rootState.props.isOpen = handleTop < window.innerHeight * threshold;
		}
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
