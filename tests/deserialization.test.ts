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

    const tree = RuleTree.fromJSON(
      {
        root: {
          type: "group",
          operator: "and",
          children: [],
        },
      },
      context,
    );

    expect(tree).toBeInstanceOf(RuleTree);
  });
});
