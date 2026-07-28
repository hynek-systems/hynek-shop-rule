# Serialization contract

`RuleTree.toJSON()` produces the stable persistence format. `RuleContext.fromJSON()`
accepts external data, validates its structure and context references, and restores
operator-specific values.

## Version 1

```json
{
  "version": 1,
  "root": {
    "type": "group",
    "operator": "and",
    "children": [
      {
        "type": "rule",
        "field": "country",
        "operator": "=",
        "value": "SE"
      }
    ]
  }
}
```

The exported `RuleTreeDto`, `GroupDto`, `RuleDto`, and `NodeDto` types describe
this shape. Group and operator IDs are application-level identifiers and must be
registered in the `RuleContext` used to restore the tree.

## Compatibility policy

- Version 1 is the current write format.
- The original format without a `version` property is read as legacy version 0.
- Unknown explicit versions fail with `UNSUPPORTED_VERSION`.
- A new major format version will only be written by a new major package version.
- Readers may retain support for older formats or provide an explicit migration;
  support will not be removed in a minor or patch package release.

Compatibility fixtures live in `tests/fixtures` and are exercised by the
deserialization tests.

## Errors

Invalid input throws `RuleTreeDeserializationError`. Its `code` is stable for
programmatic handling and its `path` identifies the failing DTO value, for example
`$.root.children[0].value`.

Error codes:

- `INVALID_DTO`
- `UNSUPPORTED_VERSION`
- `UNKNOWN_GROUP_OPERATOR`
- `UNKNOWN_RULE_OPERATOR`
- `UNKNOWN_FIELD`
- `INVALID_OPERAND`

If a context contains registered fields, every deserialized rule must reference
one of them. A context with no fields remains schema-free and accepts any non-empty
field ID.

## Value behavior

- Equality operators preserve `null` and compare with strict equality.
- Missing properties resolved by `ObjectFieldResolver` produce `undefined`.
- String, numeric, and date operators return `false` when the resolved field value
  has the wrong runtime type.
- Date operands are serialized as ISO 8601 strings. Invalid dates are rejected.
- Between operands are serialized as `{ "from": ..., "to": ... }`. Bounds must
  both be finite numbers or both be valid dates, and `from` must not exceed `to`.
