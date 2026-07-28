# Extension points

The package exports stable base APIs for custom fields, operators, resolvers,
visitors, and registries. Extensions should import only from `@campino/rule`.

## Custom operator and field type

```ts
import {
  Field,
  FieldType,
  OperandKind,
  RuleOperator,
  ValueControl,
  assertRuleOperatorContract,
} from "@campino/rule";

class DivisibleByOperator extends RuleOperator {
  readonly id = "divisible_by";
  readonly label = "Divisible by";
  readonly operandKind = OperandKind.Single;

  isValidOperand(value: unknown): boolean {
    return typeof value === "number" && Number.isFinite(value) && value !== 0;
  }

  evaluate(left: unknown, right: unknown): boolean {
    return (
      typeof left === "number" &&
      typeof right === "number" &&
      this.isValidOperand(right) &&
      left % right === 0
    );
  }
}

const divisibleBy = new DivisibleByOperator();

assertRuleOperatorContract(divisibleBy, {
  validOperands: [2, 3],
  invalidOperands: [0, "2"],
});

const integerType = new FieldType<number>(
  "integer",
  "Integer",
  ValueControl.Number,
  [divisibleBy.id],
  0,
);
const quantity = new Field("quantity", "Quantity", integerType);
```

`isValidOperand` validates the in-memory value after deserialization. Override
`serializeOperand` and `deserializeOperand` when the value is not directly
JSON-compatible. `assertRuleOperatorContract` checks metadata, known operands,
and serialization round trips without requiring a specific test runner.

## Context-aware rule creation

Register the field and operator, then use `RuleContext.createRule` to enforce
their contracts before inserting a rule into a tree:

```ts
context.fields.register(quantity);
context.ruleOperators.register(divisibleBy);

const rule = context.createRule("quantity", "divisible_by", 3);
tree.root.append(rule);
```

Unknown registry IDs throw `RegistryError`. Unsupported field operators and
invalid operands throw `RuleCreationError` with stable error codes.

## Other extensions

- Implement `FieldResolver<T>` for nested, computed, or non-object data models.
- Implement `NodeVisitor<TResult>` for direct dispatch or extend
  `TraversingNodeVisitor<TResult>` for post-order tree traversal.
- Extend `Registry<TKey, TValue>` when values need a custom keyed registry.

Registry keys are unique. Duplicate registration throws `DUPLICATE_KEY` and an
unknown lookup throws `UNKNOWN_KEY`.

## Operator policy

Built-in operators are added only for verified consumer requirements with
defined null, type, serialization, and validation semantics. Membership, empty
value, and negation operators remain extension examples until those semantics
are grounded in a concrete use case.
