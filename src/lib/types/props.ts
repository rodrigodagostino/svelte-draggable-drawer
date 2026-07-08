import type { Snippet } from 'svelte';

export interface DrawerRootProps {
	ref?: HTMLDivElement | null;
	isOpen?: boolean;
	children?: Snippet;
}

export interface DrawerContentProps {
	ref?: HTMLDivElement | null;
	children?: Snippet;
}

export interface DrawerContentHandleProps {
	ref?: HTMLButtonElement | null;
	children?: Snippet;
}
