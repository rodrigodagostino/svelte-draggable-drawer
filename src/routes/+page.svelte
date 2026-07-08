<script lang="ts">
	import { onMount } from 'svelte';
	import { Drawer } from '$lib/index.js';
	import { defaultRootProps } from './fixtures.js';
	import layoutState from './states.svelte.js';
	import '$lib/styles.css';

	onMount(() => {
		layoutState.props = { ...defaultRootProps };
	});

	let isOpen = $state<Drawer.RootProps['isOpen']>(false);
</script>

<svelte:head>
	<title>Basic — Svelte Draggable Drawer</title>
</svelte:head>

<h1 style="margin-block-end: 1rem">Svelte Draggable Drawer</h1>
<button class="button" onclick={() => (isOpen = !isOpen)}>Open drawer</button>

<Drawer.Root {...layoutState.props} bind:isOpen>
	<Drawer.Content>
		<Drawer.ContentHandle>
			<span>Handle</span>
		</Drawer.ContentHandle>
		<div style="display: flex; flex-direction: column; text-align: center">
			<h1>Heading</h1>
			<p>Paragraph</p>
		</div>
	</Drawer.Content>
	<Drawer.Backdrop />
</Drawer.Root>
