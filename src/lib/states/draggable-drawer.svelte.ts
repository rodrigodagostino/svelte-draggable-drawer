import { getContext, setContext } from 'svelte';
import type { DraggableDrawerRootStateContext as Context } from '$lib/types/index.js';

class DraggableDrawerRootState {
	props: Context['props'] = $state({});
	dragState: Context['dragState'] = $state('idle');
	content: Context['content'] = $state(null);
	handle: Context['handle'] = $state(null);
	pointer: Context['pointer'] = $state.raw(null);
	pointerOrigin: Context['pointerOrigin'] = $state.raw(null);
	contentOrigin: Context['contentOrigin'] = $state.raw(null);
}

const KEY = Symbol('DraggableDrawer.RootState');

export function setDraggableDrawerRootState() {
	return setContext(KEY, new DraggableDrawerRootState());
}

export function getDraggableDrawerRootState() {
	return getContext<ReturnType<typeof setDraggableDrawerRootState>>(KEY);
}
