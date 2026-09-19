export function toCSSLength(value: number | string): string {
	return typeof value === 'number' ? `${value}px` : value;
}

export function toPixels(value: string | number | undefined, fallback: number) {
	if (value === undefined) return fallback;
	if (typeof value === 'number') return value;
	if (value.endsWith('%')) return (parseFloat(value) / 100) * window.innerHeight;
	return parseFloat(value);
}
