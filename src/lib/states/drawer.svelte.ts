import { getContext, setContext } from 'svelte';
import type { DrawerRootProps as RootProps } from '$lib/types/index.js';

class DrawerRootState {
	ref: HTMLElement | null = $state(null);
	props: RootProps = $state({});
	dragState: 'idle' | 'drag-start' | 'drag' | 'drop' = $state('idle');
	content: HTMLElement | null = $state(null);
	handle: HTMLButtonElement | null = $state(null);
	pointer: { x: number; y: number } | null = $state.raw(null);
	pointerOrigin: { x: number; y: number } | null = $state.raw(null);
	contentOrigin: { x: number; y: number } | null = $state.raw(null);
	activeSnapPoint: { index: number; value: string | number } | null = $state(null);
}

const KEY = Symbol('Drawer.RootState');

export function setDrawerRootState() {
	return setContext(KEY, new DrawerRootState());
}

export function getDrawerRootState() {
	return getContext<ReturnType<typeof setDrawerRootState>>(KEY);
}
