<script lang="ts">
	import { onMount } from 'svelte';
	import { getHandle, getRootProps } from '$lib/stores/index.js';

	let handleRef: HTMLButtonElement;

	const handle = getHandle();

	const rootProps = getRootProps();

	onMount(() => {
		$handle = handleRef;
	});

	const handleKeyUp = ({ key }: KeyboardEvent) => {
		if (key === 'Enter' || key === ' ') {
			$rootProps.isOpen = !$rootProps.isOpen;
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
