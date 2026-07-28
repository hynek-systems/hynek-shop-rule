# API stability

Version 1 follows semantic versioning for the package entrypoint and persisted
rule tree format.

## Public API

Symbols exported from `@campino/rule` are public. Removing an export,
changing a public method signature incompatibly, narrowing accepted input, or
changing documented behavior requires a major release.

Internal source paths are not package exports and are not stable APIs. Consumers
must not import files below `src` or `dist`.

Additive exports, optional properties, new error codes, and new operator classes
may be released in a minor version. Compatible fixes and documentation changes
may be released in a patch version.

## Behavioral contracts

- `Rule`, `Group`, and their operators are mutable by design. Tree ownership and
  maximum-depth invariants are enforced by `Group` mutation methods.
- A cloned tree has new nodes and cloned operand values. Operator instances are
  shared because operators are expected to be stateless.
- A field type without an explicit default has `defaultValue === undefined`.
- Error class names and error `code` values are public. Human-readable messages
  may be clarified without a major release.
- `ObjectFieldResolver` returns `undefined` for a missing direct property. It does
  not resolve dotted or nested paths.

## Persistence

The serialized format has its own `version`. Package and format versions do not
need to match. Compatibility and migration rules are defined in
`serialization.md`.

## Runtime support

The supported runtime is declared in `package.json` and tested on the active
Node.js 22 and 24 release lines. Dropping a supported Node.js major version
requires a package major release.
