<script lang="ts">
	import { onMount } from 'svelte';
	import { getHandle } from '$lib/stores/index.js';

	let handleRef: HTMLButtonElement;

	const handle = getHandle();

	onMount(() => {
		$handle = handleRef;
	});
</script>

<button bind:this={handleRef} class="sdd-handle" data-role="handle">
	<slot />
</button>

<style>
	.sdd-handle {
		margin-inline: auto;
		user-select: none;
	}
</style>
