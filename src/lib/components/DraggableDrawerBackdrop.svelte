<script lang="ts">
	import { getPointer, getRootProps } from '$lib/stores/index.js';
	import { getDragState } from '$lib/stores/states.js';

	let offsetHeight: number;

	const rootProps = getRootProps();

	const pointer = getPointer();

	const dragState = getDragState();

	function getStyleOpacity(...args: unknown[]) {
		if ($dragState === 'drag' && $pointer) {
			return ($pointer.y / offsetHeight / 2 - 0.5) * -1;
		}
		if ($rootProps.isOpen) return 0.5;
		return 0;
	}

	function getStyleTransition(...args: unknown[]) {
		if ($dragState !== 'drag-start' && $dragState !== 'drag') return 'opacity 240ms';
		return 'none';
	}

	$: styleOpacity = getStyleOpacity($pointer, $dragState, $rootProps.isOpen);
	$: styleTransition = getStyleTransition($dragState);

	const handleClick = () => {
		$rootProps.isOpen = false;
	};
</script>

<div
	bind:offsetHeight
	class="sdd-backdrop"
	style:opacity={styleOpacity}
	style:transition={styleTransition}
	style:pointer-events={$rootProps.isOpen ? 'auto' : 'none'}
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
