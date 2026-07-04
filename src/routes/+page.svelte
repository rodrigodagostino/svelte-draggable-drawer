<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { DraggableDrawer } from '$lib/index.js';
	import { defaultRootProps } from './fixtures.js';
	import { rootProps } from './stores.js';
	import '$lib/styles.css';

	onMount(() => {
		$rootProps = { ...defaultRootProps };
	});

	let isOpen: DraggableDrawer.RootProps['isOpen'] = false;

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

<DraggableDrawer.Root {...$rootProps} bind:isOpen>
	<DraggableDrawer.Content>
		<DraggableDrawer.Handle>
			<span>Handle</span>
		</DraggableDrawer.Handle>
		<h1>Heading</h1>
		<p>Paragraph</p>
	</DraggableDrawer.Content>
	<DraggableDrawer.Backdrop />
</DraggableDrawer.Root>
