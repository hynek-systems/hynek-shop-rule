# @campino/rule

A typed TypeScript library for building, validating, evaluating, cloning, and
serializing rule trees.

## Installation

```bash
npm install @campino/rule
```

The package is ESM-only and includes TypeScript declarations.

## Quick start

```ts
import {
  AndOperator,
  EqualsOperator,
  Field,
  GreaterThanOperator,
  NumberFieldType,
  ObjectFieldResolver,
  Rule,
  RuleContext,
  RuleEvaluator,
  RuleTree,
  RuleTreeCloner,
  RuleTreeValidator,
  StringFieldType,
} from "@campino/rule";

const context = new RuleContext();

context.groupOperators.register(new AndOperator());
context.ruleOperators.register(new EqualsOperator());
context.ruleOperators.register(new GreaterThanOperator());

context.fields.register(new Field("country", "Country", StringFieldType));
context.fields.register(new Field("price", "Price", NumberFieldType));

const tree = new RuleTree();

tree.root.append(Rule.field<string>("country").equals("SE"));
tree.root.append(Rule.field<number>("price").greaterThan(100));

const errors = new RuleTreeValidator().validate(tree);

if (errors.length > 0) {
  throw new Error(errors.map((error) => error.message).join("\n"));
}

const evaluator = new RuleEvaluator(new ObjectFieldResolver());
const matches = evaluator.evaluate(tree, { country: "SE", price: 150 });

const dto = tree.toJSON();
const restored = context.fromJSON(dto);
const copy = new RuleTreeCloner().clone(restored);

console.log(matches); // true
console.log(copy.toString());
```

`RuleContext` must contain every group and rule operator referenced by a DTO
before calling `fromJSON`. Register fields when the context is also used to
drive a rule editor or to look up the operators available for a field.

## Core concepts

- `RuleTree` owns a root `Group`. The root uses `AndOperator` by default.
- `Rule.field<T>()` creates a typed expression builder for a field or field ID.
- `Group` combines child results with an `AndOperator` or `OrOperator`.
- `RuleTreeValidator` reports structural errors such as empty groups and rules
  without a field ID.
- `RuleEvaluator` evaluates a tree using a `FieldResolver`. The included
  `ObjectFieldResolver` reads direct properties from plain objects.
- `RuleTree.toJSON()` and `RuleContext.fromJSON()` provide the supported
  persistence round trip.

## Built-in field types

| Export             | Value type | Default control | Configured operator IDs                                                                          |
| ------------------ | ---------- | --------------- | ------------------------------------------------------------------------------------------------ |
| `StringFieldType`  | `string`   | text            | `=`, `!=`, `contains`, `starts_with`, `ends_with`                                                |
| `NumberFieldType`  | `number`   | number          | `=`, `!=`, `greater_than`, `greater_than_or_equal`, `less_than`, `less_than_or_equal`, `between` |
| `BooleanFieldType` | `boolean`  | boolean         | none                                                                                             |
| `DateFieldType`    | `Date`     | date            | `=`, `!=`, `before`, `after`, `between`                                                          |

A field can override its type's operator IDs:

```ts
const status = new Field("status", "Status", StringFieldType, {
  operators: ["=", "!="],
});
```

## Built-in operators

Rule operators:

- Equality: `EqualsOperator`, `NotEqualsOperator`
- Strings: `ContainsOperator`, `StartsWithOperator`, `EndsWithOperator`
- Numbers: `GreaterThanOperator`, `GreaterThanOrEqualOperator`,
  `LessThanOperator`, `LessThanOrEqualOperator`
- Numbers and dates: `BetweenOperator`
- Dates: `BeforeOperator`, `AfterOperator`

Group operators: `AndOperator` and `OrOperator`.

Register every operator that a `RuleContext` should expose or deserialize:

```ts
context.ruleOperators.register(new EqualsOperator());
```

Duplicate IDs and lookups of unknown IDs throw an error.

## Custom field resolution

Implement `FieldResolver<T>` when values are nested, computed, or fetched from
another data model:

```ts
import type { FieldResolver } from "@campino/rule";

interface Product {
  attributes: Record<string, unknown>;
}

class ProductFieldResolver implements FieldResolver<Product> {
  resolve(product: Product, field: string): unknown {
    return product.attributes[field];
  }
}
```

## Development

Install dependencies and run the release checks with Vite+:

```bash
vp install
vp check
vp test
vp pack
```

See [ROADMAP.md](ROADMAP.md) for planned API stabilization and release goals.
The persisted DTO format and compatibility policy are documented in
[docs/serialization.md](docs/serialization.md).
Supported customization APIs are documented in
[docs/extensions.md](docs/extensions.md).
Release operations are documented in [docs/releasing.md](docs/releasing.md), and
vulnerability reporting is covered by [SECURITY.md](SECURITY.md).
Performance baselines and budgets are documented in
[docs/performance.md](docs/performance.md).
Public compatibility guarantees are documented in
[docs/api-stability.md](docs/api-stability.md).
