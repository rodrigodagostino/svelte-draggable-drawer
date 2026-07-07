import type { Snippet } from 'svelte';

export interface DrawerRootProps {
	ref?: HTMLDivElement | null;
	isOpen?: boolean;
	children?: Snippet;
}
