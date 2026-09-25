<script lang="ts">
	import { onMount } from 'svelte';
	import { Drawer } from '$lib/index.js';
	import DummyContent from '../components/DummyContent.svelte';
	import { defaultRootProps } from '../fixtures.js';
	import layoutState from '../states.svelte.js';
	import '$lib/styles.css';

	onMount(() => {
		layoutState.props = {
			...defaultRootProps,
			range: { start: 48, end: 48 },
		};
	});

	let isOpen = $derived<Drawer.RootProps['isOpen']>(layoutState.props.isOpen);
</script>

<svelte:head>
	<title>With handle — Svelte Draggable Drawer</title>
</svelte:head>

<DummyContent type="landing" bind:isOpen />

<Drawer.Root {...layoutState.props} bind:isOpen>
	<Drawer.Content>
		<Drawer.ContentHandle>
			<span>Handle</span>
		</Drawer.ContentHandle>
		<DummyContent />
	</Drawer.Content>
	<Drawer.Backdrop />
</Drawer.Root>
