<script lang="ts">
	import { getContentOrigin, getPointer, getPointerOrigin } from '$lib/stores/coordinates.js';
	import { getContent, getHandle } from '$lib/stores/index.js';
	import { getDragState, getIsExpanded } from '$lib/stores/states.js';
	import { onMount } from 'svelte';

	let contentRef: HTMLDivElement;

	const content = getContent();
	const handle = getHandle();
	$: handleRect = $handle?.getBoundingClientRect();

	const pointer = getPointer();
	const pointerOrigin = getPointerOrigin();
	const contentOrigin = getContentOrigin();

	const dragState = getDragState();
	const isExpanded = getIsExpanded();

	onMount(() => {
		$content = contentRef;
	});

	function getStyleTransform(...args: unknown[]) {
		if ($dragState === 'drag') {
			if (!$pointer || !$pointerOrigin || !$contentOrigin) return 'none';
			// Prevent the drawer from being dragged above the top of the screen or below the bottom.
			const y =
				$pointerOrigin.y > window.innerHeight / 2
					? $pointer.y > $pointerOrigin.y
						? $pointerOrigin.y
						: $pointer.y
					: $pointer.y < $pointerOrigin.y
						? $pointerOrigin.y
						: $pointer.y;
			// Set the position of the content relative to the pointer.
			const offset = $contentOrigin.y - $pointerOrigin.y;

			return `translate3d(0, ${y + offset}px, 0)`;
		}

		if ($isExpanded) return `translate3d(0, calc(0% + ${handleRect?.height || 24}px), 0)`;

		return `translate3d(0, calc(100% - ${handleRect?.height || 48}px), 0)`;
	}

	$: styleTransform = getStyleTransform($pointer, $dragState, $isExpanded);
	$: styleTransition =
		$dragState !== 'drag-start' && $dragState !== 'drag'
			? `transform 400ms cubic-bezier(0.32, 0.72, 0, 1)`
			: 'none';
</script>

<div
	bind:this={contentRef}
	class="sdd-content"
	style:transform={styleTransform}
	style:transition={styleTransition}
>
	<slot />
</div>

<style>
	.sdd-content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		pointer-events: auto;
		position: relative;
		z-index: 1;
	}
</style>
