# Changelog

All notable changes to this project will be documented in this file.

## 0.2.0 - 2026-07-28

- Version the serialized rule tree format while retaining legacy format support.
- Validate external DTO structure, context references, and built-in operands.
- Add stable error codes and paths for deserialization, validation, and registries.
- Document persistence compatibility and add versioned fixtures.

## 0.1.0 - 2026-07-28

- Expose the evaluation, field resolution, registry, serialization type, and
  validation APIs from the package entrypoint.
- Add an end-to-end public API test.
- Add package usage, field type, operator, and extension documentation.
- Verify the packed runtime and TypeScript declarations in an isolated
  consumer before publishing.
