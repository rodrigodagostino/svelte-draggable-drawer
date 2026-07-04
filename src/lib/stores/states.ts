import { getWritableContext, setWritableContext } from './index.js';
import type { DraggableDrawerDragState as DragState } from '$lib/types/index.js';

export function setDragState(context: DragState) {
	return setWritableContext<DragState>('dragState', context);
}
export function getDragState() {
	return getWritableContext<DragState>('dragState');
}
