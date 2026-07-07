import { writable } from 'svelte/store';
import type { DrawerRootProps as RootProps } from '$lib/types/index.js';
import { defaultRootProps } from './fixtures.js';

export const rootProps = writable<RootProps>(defaultRootProps);
