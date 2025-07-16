import { getWritableContext, setWritableContext } from './index.js';
import type { DraggableDrawerElements as Elements } from '$lib/types/index.js';

export function setRoot(context: Elements['root']) {
	return setWritableContext<Elements['root']>('root', context);
}
export function getRoot() {
	return getWritableContext<Elements['root']>('root');
}

export function setContent(context: Elements['content']) {
	return setWritableContext<Elements['content']>('content', context);
}
export function getContent() {
	return getWritableContext<Elements['content']>('content');
}

export function setHandle(context: Elements['handle']) {
	return setWritableContext<Elements['handle']>('handle', context);
}
export function getHandle() {
	return getWritableContext<Elements['handle']>('handle');
}
