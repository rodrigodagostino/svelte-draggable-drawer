<script lang="ts">
	import { onMount } from 'svelte';
	import { getHandle, getIsExpanded } from '$lib/stores/index.js';

	let handleRef: HTMLButtonElement;

	const handle = getHandle();

	const isExpanded = getIsExpanded();

	onMount(() => {
		$handle = handleRef;
	});

	const handleKeyUp = ({ key }: KeyboardEvent) => {
		if (key === 'Enter' || key === ' ') {
			$isExpanded = !$isExpanded;
		}
	};
</script>

<button bind:this={handleRef} class="sdd-handle" data-role="handle" on:keyup={handleKeyUp}>
	<slot />
</button>

<style>
	.sdd-handle {
		margin-inline: auto;
		user-select: none;
	}
</style>
