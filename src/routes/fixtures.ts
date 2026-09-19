import { RANGE_END_DEFAULT, RANGE_START_DEFAULT } from '$lib/constants/index.js';
import type { DrawerRootProps as RootProps } from '$lib/types/index.js';

export const defaultRootProps: RootProps = {
	range: { start: RANGE_START_DEFAULT, end: RANGE_END_DEFAULT },
	isOpen: false,
};
