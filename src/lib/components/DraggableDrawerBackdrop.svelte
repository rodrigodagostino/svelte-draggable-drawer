<script lang="ts">
	import { getPointer } from '$lib/stores/index.js';
	import { getDragState, getIsExpanded } from '$lib/stores/states.js';

	let offsetHeight: number;

	const pointer = getPointer();

	const dragState = getDragState();
	const isExpanded = getIsExpanded();

	function getStyleOpacity(...args: unknown[]) {
		if ($dragState === 'drag' && $pointer) {
			return ($pointer.y / offsetHeight / 2 - 0.5) * -1;
		}

		if ($isExpanded) return 0.5;

		return 0;
	}

	function getStyleTransition(...args: unknown[]) {
		if ($dragState !== 'drag-start' && $dragState !== 'drag') return 'opacity 240ms';
		return 'none';
	}

	$: styleOpacity = getStyleOpacity($pointer, $dragState, $isExpanded);
	$: styleTransition = getStyleTransition($dragState);

	const handleClick = () => {
		$isExpanded = false;
	};
</script>

<div
	bind:offsetHeight
	class="sdd-backdrop"
	style:opacity={styleOpacity}
	style:transition={styleTransition}
	aria-hidden="true"
	on:click={handleClick}
></div>

<style>
	.sdd-backdrop {
		position: fixed;
		inset: 0;
		z-index: 0;
	}
</style>
