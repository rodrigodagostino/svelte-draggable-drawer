import { getContext, setContext } from 'svelte';
import type { DrawerRootStateContext as Context } from '$lib/types/index.js';

class DrawerRootState {
	props: Context['props'] = $state({});
	dragState: Context['dragState'] = $state('idle');
	content: Context['content'] = $state(null);
	handle: Context['handle'] = $state(null);
	pointer: Context['pointer'] = $state.raw(null);
	pointerOrigin: Context['pointerOrigin'] = $state.raw(null);
	contentOrigin: Context['contentOrigin'] = $state.raw(null);
}

const KEY = Symbol('Drawer.RootState');

export function setDrawerRootState() {
	return setContext(KEY, new DrawerRootState());
}

export function getDrawerRootState() {
	return getContext<ReturnType<typeof setDrawerRootState>>(KEY);
}
