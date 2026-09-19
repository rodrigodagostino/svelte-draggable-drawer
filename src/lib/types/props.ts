import type { Snippet } from 'svelte';

export interface DrawerRootProps {
	ref?: HTMLElement | null;
	range?: { start: string | number; end: string | number };
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

export interface DrawerBackdropProps {
	ref?: HTMLDivElement | null;
}
