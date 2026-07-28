import { describe, expect, it } from "vite-plus/test";
import { OperatorRegistry } from "../src/operators/operator-registry.ts";
import { GroupOperator } from "../src/operators/group/group-operator.ts";
import { AndOperator } from "../src/operators/group/and-operator.ts";
import { RuleOperator } from "../src/operators/rule/rule-operator.ts";
import { EqualsOperator } from "../src/operators/rule/equals-operator.ts";
import { RuleTreeDeserializer } from "../src/serializer/rule-tree-deserializer.ts";
import { RuleTreeSerializer } from "../src/serializer/rule-tree-serializer.ts";
import { RuleTree } from "../src/tree/rule-tree.ts";
import { Rule } from "../src/nodes/rule.ts";
import { RuleContext } from "../src/rule-context.ts";
import { Field } from "../src/fields/field.ts";
import { StringFieldType } from "../src/fields/field-types.ts";
import { GreaterThanOperator } from "../src/operators/rule/greater-than-operator.ts";
import { BeforeOperator } from "../src/operators/rule/before-operator.ts";
import { BetweenOperator } from "../src/operators/rule/between-operator.ts";
import {
  RuleTreeDeserializationError,
  RuleTreeDeserializationErrorCode,
} from "../src/serializer/rule-tree-deserialization-error.ts";

describe("RuleTree deserialization", () => {
  it("deserializes a tree", () => {
    const context = new RuleContext();
    context.groupOperators.register(new AndOperator());
    context.ruleOperators.register(new EqualsOperator());

    const tree = new RuleTreeDeserializer(context).deserialize({
      root: {
        type: "group",
        operator: "and",
        children: [
          {
            type: "rule",
            field: "country",
            operator: "=",
            value: "SE",
          },
        ],
      },
    });

    expect(tree.root.children).toHaveLength(1);
  });

  it("should verify roundtrip", () => {
    const groupOperators = new OperatorRegistry<GroupOperator>();
    groupOperators.register(new AndOperator());

    const ruleOperators = new OperatorRegistry<RuleOperator>();
    ruleOperators.register(new EqualsOperator());

    const context = new RuleContext();
    context.groupOperators.register(new AndOperator());
    context.ruleOperators.register(new EqualsOperator());

    const original = new RuleTree();

    original.root.append(Rule.field("country").equals("SE"));

    const dto = new RuleTreeSerializer().serialize(original);

    const restored = new RuleTreeDeserializer(context).deserialize(dto);

    expect(new RuleTreeSerializer().serialize(restored)).toEqual(dto);
  });

  it("creates a tree using RuleTree.fromJSON", () => {
    const context = new RuleContext();

    context.groupOperators.register(new AndOperator());

    context.ruleOperators.register(new EqualsOperator());

    const tree = context.fromJSON({
      root: {
        type: "group",
        operator: "and",
        children: [],
      },
    });

    expect(tree).toBeInstanceOf(RuleTree);
  });

  it.each([
    {
      name: "unsupported versions",
      dto: { version: 2, root: {} },
      code: RuleTreeDeserializationErrorCode.UnsupportedVersion,
      path: "$.version",
    },
    {
      name: "malformed root nodes",
      dto: { version: 1, root: null },
      code: RuleTreeDeserializationErrorCode.InvalidDto,
      path: "$.root",
    },
    {
      name: "unknown group operators",
      dto: {
        version: 1,
        root: { type: "group", operator: "missing", children: [] },
      },
      code: RuleTreeDeserializationErrorCode.UnknownGroupOperator,
      path: "$.root.operator",
    },
  ])("reports $name with a stable code and path", ({ dto, code, path }) => {
    const context = new RuleContext();

    expect(() => context.fromJSON(dto)).toThrowError(
      expect.objectContaining<Partial<RuleTreeDeserializationError>>({ code, path }),
    );
  });

  it("reports unknown rule operators at their node path", () => {
    const context = new RuleContext();
    context.groupOperators.register(new AndOperator());

    expect(() =>
      context.fromJSON({
        version: 1,
        root: {
          type: "group",
          operator: "and",
          children: [{ type: "rule", field: "country", operator: "missing", value: "SE" }],
        },
      }),
    ).toThrowError(
      expect.objectContaining<Partial<RuleTreeDeserializationError>>({
        code: RuleTreeDeserializationErrorCode.UnknownRuleOperator,
        path: "$.root.children[0].operator",
      }),
    );
  });

  it("reports unknown fields when the context defines a field schema", () => {
    const context = new RuleContext();
    context.groupOperators.register(new AndOperator());
    context.ruleOperators.register(new EqualsOperator());
    context.fields.register(new Field("country", "Country", StringFieldType));

    expect(() =>
      context.fromJSON({
        version: 1,
        root: {
          type: "group",
          operator: "and",
          children: [{ type: "rule", field: "missing", operator: "=", value: "SE" }],
        },
      }),
    ).toThrowError(
      expect.objectContaining<Partial<RuleTreeDeserializationError>>({
        code: RuleTreeDeserializationErrorCode.UnknownField,
        path: "$.root.children[0].field",
      }),
    );
  });

  it.each([
    {
      name: "a non-numeric comparison value",
      operator: new GreaterThanOperator(),
      value: "100",
    },
    {
      name: "an invalid date",
      operator: new BeforeOperator(),
      value: "not-a-date",
    },
    {
      name: "a reversed range",
      operator: new BetweenOperator(),
      value: { from: 20, to: 10 },
    },
  ])("rejects $name", ({ operator, value }) => {
    const context = new RuleContext();
    context.groupOperators.register(new AndOperator());
    context.ruleOperators.register(operator);

    expect(() =>
      context.fromJSON({
        version: 1,
        root: {
          type: "group",
          operator: "and",
          children: [{ type: "rule", field: "value", operator: operator.id, value }],
        },
      }),
    ).toThrowError(
      expect.objectContaining<Partial<RuleTreeDeserializationError>>({
        code: RuleTreeDeserializationErrorCode.InvalidOperand,
        path: "$.root.children[0].value",
      }),
    );
  });
});
