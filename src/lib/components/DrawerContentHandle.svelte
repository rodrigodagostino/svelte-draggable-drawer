<script lang="ts">
	import { getDrawerRootState } from '$lib/states/drawer.svelte.js';
	import type { DrawerContentHandleProps as ContentHandleProps } from '$lib/types/props.js';

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: ContentHandleProps & { class?: string } = $props();

	const rootState = getDrawerRootState();

	$effect(() => {
		rootState.handle = ref;
	});

	const classes = $derived(['sdd-content-handle', restProps.class]);

	const handleKeyUp = ({ key }: KeyboardEvent) => {
		if (key === 'Enter' || key === ' ') {
			rootState.props.isOpen = !rootState.props.isOpen;
		}
	};
</script>

<button bind:this={ref} class={classes} data-role="handle" onkeyup={handleKeyUp}>
	{#if children}
		{@render children()}
	{:else}
		<span class="sr-only">Handle</span>
	{/if}
</button>

<style>
	.sdd-content-handle {
		margin-inline: auto;
		user-select: none;

		.sr-only {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
		}
	}
</style>
