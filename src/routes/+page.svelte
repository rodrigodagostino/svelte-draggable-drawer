<script lang="ts">
	import { onMount } from 'svelte';
	import { Drawer } from '$lib/index.js';
	import DummyContent from './components/DummyContent.svelte';
	import { defaultRootProps } from './fixtures.js';
	import layoutState from './states.svelte.js';
	import '$lib/styles.css';

	onMount(() => {
		layoutState.props = { ...defaultRootProps };
	});

	let isOpen = $derived<Drawer.RootProps['isOpen']>(layoutState.props.isOpen);
</script>

<svelte:head>
	<title>Basic — Svelte Draggable Drawer</title>
</svelte:head>

<DummyContent type="landing" bind:isOpen />

<Drawer.Root {...layoutState.props} bind:isOpen>
	<Drawer.Content>
		<DummyContent />
	</Drawer.Content>
	<Drawer.Backdrop />
</Drawer.Root>
