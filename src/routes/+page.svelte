<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Drawer } from '$lib/index.js';
	import { defaultRootProps } from './fixtures.js';
	import { rootProps } from './stores.js';
	import '$lib/styles.css';

	onMount(() => {
		$rootProps = { ...defaultRootProps };
	});

	let isOpen: Drawer.RootProps['isOpen'] = false;

	$: $rootProps = { isOpen };
	const unsubscribe = rootProps.subscribe((value) => {
		isOpen = value.isOpen;
	});
	onDestroy(unsubscribe);
</script>

<svelte:head>
	<title>Basic | Svelte Draggable Drawer</title>
</svelte:head>

<h1 class="heading-1" style="margin-block-end: 1rem">Svelte Draggable Drawer</h1>
<button class="button" on:click={() => (isOpen = !isOpen)}>Open drawer</button>

<Drawer.Root {...$rootProps} bind:isOpen>
	<Drawer.Content>
		<Drawer.Handle>
			<span>Handle</span>
		</Drawer.Handle>
		<h1>Heading</h1>
		<p>Paragraph</p>
	</Drawer.Content>
	<Drawer.Backdrop />
</Drawer.Root>
