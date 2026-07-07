import type { DraggableDrawerRootProps as RootProps } from './props.js';

export interface DraggableDrawerRootStateContext {
	ref: HTMLUListElement | null;
	props: RootProps;
	dragState: 'idle' | 'drag-start' | 'drag' | 'drop';
	content: HTMLDivElement | null;
	handle: HTMLButtonElement | null;
	pointer: { x: number; y: number } | null;
	pointerOrigin: { x: number; y: number } | null;
	contentOrigin: { x: number; y: number } | null;
}
