import { getWritableContext, setWritableContext } from './index.js';
import type { DraggableDrawerRootProps as RootProps } from '$lib/types/index.js';

export function setRootProps(context: RootProps) {
	return setWritableContext<RootProps>('rootProps', context);
}
export function getRootProps() {
	return getWritableContext<RootProps>('rootProps');
}
