import { writable } from 'svelte/store';
import type { DraggableDrawerRootProps as RootProps } from '$lib/types/index.js';
import { defaultRootProps } from './fixtures.js';

export const rootProps = writable<RootProps>(defaultRootProps);
