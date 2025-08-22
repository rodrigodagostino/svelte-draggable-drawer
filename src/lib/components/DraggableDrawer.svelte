<script lang="ts">
	import {
		setContent,
		setContentOrigin,
		setDragState,
		setHandle,
		setIsExpanded,
		setPointer,
		setPointerOrigin,
	} from '$lib/stores/index.js';

	let pointerId: PointerEvent['pointerId'] | null = null;
	const pointer = setPointer(null);
	const pointerOrigin = setPointerOrigin(null);
	const content = setContent(null);
	const contentOrigin = setContentOrigin(null);
	const handle = setHandle(null);

	const dragState = setDragState('idle');
	const isExpanded = setIsExpanded(false);

	const TOP_THRESHOLD = 2 / 5;
	const BOTTOM_THRESHOLD = 3 / 5;

	let transitionTimeoutId: number | null = null;

	function handlePointerDown(e: PointerEvent) {
		const target = e.target as HTMLElement;
		if (!$handle || !target.closest('[data-role="handle"]') || !$content) return;

		pointerId = e.pointerId;
		$handle.setPointerCapture(pointerId);
		$pointer = { x: e.clientX, y: e.clientY };
		$pointerOrigin = { x: e.clientX, y: e.clientY };
		$contentOrigin = $content.getBoundingClientRect();
		$dragState = 'drag-start';

		$handle.addEventListener('pointermove', handlePointerMove);
		$handle.addEventListener(
			'pointerup',
			() => {
				$handle.removeEventListener('pointermove', handlePointerMove);
				handlePointerUp();
			},
			{ once: true }
		);
	}

	async function handlePointerMove({ clientX, clientY }: PointerEvent) {
		if (!$content || !$pointerOrigin) return;

		$dragState = 'drag';

		$pointer = { x: clientX, y: clientY };
		$isExpanded =
			$pointerOrigin.y > window.innerHeight / 2
				? clientY < window.innerHeight * BOTTOM_THRESHOLD
				: clientY < window.innerHeight * TOP_THRESHOLD;
	}

	function handlePointerUp() {
		if (!$pointerOrigin || !$content) return;

		$dragState = 'drop';

		function handleTransitionEnd({ propertyName }: TransitionEvent) {
			if (propertyName === 'transform') {
				handlePointerAndKeyboardDragEnd();
				$content?.removeEventListener('transitionend', handleTransitionEnd);
				if (transitionTimeoutId) {
					clearTimeout(transitionTimeoutId);
					transitionTimeoutId = null;
				}
			}
		}

		$content?.addEventListener('transitionend', handleTransitionEnd);
		// Ensure the drag operation completes even if `transitionend` doesn’t fire.
		transitionTimeoutId = setTimeout(() => {
			handlePointerAndKeyboardDragEnd();
			$content?.removeEventListener('transitionend', handleTransitionEnd);
			transitionTimeoutId = null;
		}, 400 + 100);
	}

	async function handlePointerAndKeyboardDragEnd() {
		if (pointerId) $content?.releasePointerCapture(pointerId);
		$pointerOrigin = null;
		$contentOrigin = null;
		$dragState = 'idle';
	}
</script>

<div class="sdd-root" data-drag-state={$dragState} on:pointerdown={handlePointerDown}>
	<slot />
</div>

<style>
	.sdd-root {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 9999;

		& > * {
			pointer-events: auto;
		}

		&:not(:has([data-role='handle'])),
		& [data-role='handle'] {
			touch-action: none;
			cursor: grab;
		}

		&[data-drag-state*='drag'],
		&[data-drag-state*='drag'] [data-role='handle'] {
			cursor: grabbing;
		}
	}
</style>
