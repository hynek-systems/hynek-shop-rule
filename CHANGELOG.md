# Changelog

All notable changes to this project will be documented in this file.

## 1.0.0 - 2026-07-28

- Define semantic versioning guarantees for the public API and persistence format.
- Add Node.js 22 and 24 CI, packed consumer checks, and performance budgets.
- Limit tree depth to protect recursive operations from stack exhaustion.
- Add tag-based npm publishing with provenance and generated release notes.
- Add release, runtime support, security, and API stability policies.
- Deep-clone operand values and make field defaults type-safe.

## 0.3.0 - 2026-07-28

- Export stable registry and visitor extension base APIs.
- Add framework-independent rule operator contract assertions.
- Add context-aware rule creation with operator and operand validation.
- Document and verify custom fields, operators, resolvers, visitors, and registries.

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
