# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[unreleased]: https://github.com/rodrigodagostino/svelte-draggable-drawer/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/rodrigodagostino/svelte-sortable-list/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rodrigodagostino/svelte-draggable-drawer/releases/tag/v0.1.0
