# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.1] (2026-09-25)

### BREAKING

- Size drawer content based on content height instead of viewport.

### Added

- Allow dragging from content when no handle is present.
- Improve spacing through base styles.

### Changed

- Move content width to base stylesheet.

### Fixed

- Hide division between drawer content and its bleed element.

### Docs

- Repair `isOpen` prop control not triggering changes.
- Avoid content repetition in demo pages.
- Add **“With handle”** demo page.
- Extend **“With snap points”** content to cover full viewport height.

### Chores

- Move Svelte config to Vite config.
- Install `esm-env` as peer dependency.

## [0.4.0] (2026-09-24)

### Added

- Add `snapPoints` prop for intermediate stops between start and end.

### Changed

- Ensure `snapPoints` are always sorted in ascending order.

### Docs

- Add **“With snap points”** demo page.
- Add visual markers to demo pages layout.

## [0.3.0] (2026-09-18)

### Added

- Apply rubber band effect when dragging past limits.
- Add `range` prop to customize drawer start/end position.

### Chores

- Remove duplicated state context type definitions.

### Docs

- Add `range` prop control in demo pages layout.
- Add NPM link in demo pages layout.

## [0.2.0] (2026-07-30)

### Changed

- Switch to Classes + Context API for global state management.
- Migrate `Drawer.Root` to Svelte 5.
- Migrate `Drawer.Content` to Svelte 5.
- Migrate `Drawer.ContentHandle` to Svelte 5.
- Migrate `Drawer.Backdrop` to Svelte 5.

### Fixed

- keep `isOpen` prop updated on state changes.

## [0.1.0] (2026-07-04)

### Added

- Add components base structure and styles.
- Add base drag and release functionality.
- Add keyboard support.
- Allow opening the drawer programmatically.
- Add base styles.
- Expose components and base styles.

### Changed

- Add a fallback timeout to `transitionend`.

### Docs

- Update the «Basic» page to showcase the library.
- Polish README.

[unreleased]: https://github.com/rodrigodagostino/svelte-draggable-drawer/compare/v0.4.1...HEAD
[0.4.1]: https://github.com/rodrigodagostino/svelte-draggable-drawer/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/rodrigodagostino/svelte-draggable-drawer/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/rodrigodagostino/svelte-draggable-drawer/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/rodrigodagostino/svelte-draggable-drawer/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rodrigodagostino/svelte-draggable-drawer/releases/tag/v0.1.0
