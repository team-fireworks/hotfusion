# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added Components API, with two new built-ins: `Show` for showing a component
  based on truthiness, and `Switch` for matching a component with a target value
- Added `flatten()` utility to flatten the `T` from a `UsedAs<T>` object

### Changed

- `doCleanup` now takes a variadic amount of tasks
- Reorganized the Fusion namespace
  - `Contextual` has been moved to State
  - `Safe` has been moved to Components
  - `NewJSX` and `ctorsOf` moved to dedicated RobloxTS API
  - Merged Colour with Animation
  - Expanded the External folder, down the line a dedicated Std API will suffice
  
### Fixed

- Fixed `[AttributeOut]` requiring a `Value` object

## 0.3-hotfusion.1

Initial release
