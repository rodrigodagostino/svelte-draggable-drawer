export function applyRubberBand(overdrag: number, overdragLimit: number) {
	// Apple iOS Rubber-Band formula.
	return (overdrag * overdragLimit) / (overdrag + overdragLimit);
}
