export const INTERACTIVE_ELEMENTS = new Set([
	'a',
	'audio',
	'button',
	'input',
	'optgroup',
	'option',
	'select',
	'summary',
	'textarea',
	'video',
]);
const INTERACTIVE_ROLES = new Set([
	'button',
	'checkbox',
	'combobox',
	'link',
	'menuitem',
	'menuitemcheckbox',
	'menuitemradio',
	'radio',
	'searchbox',
	'slider',
	'spinbutton',
	'switch',
	'tab',
	'textbox',
]);
export const INTERACTIVE_ROLE_ATTRIBUTES = new Set(
	[...INTERACTIVE_ROLES].map((role) => `[role="${role}"]`)
);
export const INTERACTIVE_SELECTORS = [
	...INTERACTIVE_ELEMENTS,
	...INTERACTIVE_ROLE_ATTRIBUTES,
	'[contenteditable]:not([contenteditable="false"])',
].join(', ');

// Thank you, Vojtech Miksu :)
// https://github.com/tajo/react-movable/blob/master/src/utils.ts
export function isOrResidesInInteractiveElement(target: HTMLElement, root: HTMLElement) {
	while (target && target !== root) {
		if (target.classList.contains('ssl-item-handle')) return false;

		const tagName = target.tagName.toLowerCase();
		if (INTERACTIVE_ELEMENTS.has(tagName)) return true;

		const role = target.getAttribute('role')?.toLowerCase();
		if (role && INTERACTIVE_ROLES.has(role)) return true;

		if (target.isContentEditable) return true;

		if (tagName === 'label' && target.hasAttribute('for')) return true;

		if (tagName) target = target.parentElement!;
	}

	return false;
}
