import { describe, expect, it } from "vite-plus/test";
import { Group } from "../../src/nodes/group.ts";
import { AndOperator } from "../../src/operators/group/and-operator.ts";
import { Rule } from "../../src/nodes/rule.ts";
import { EqualsOperator } from "../../src/operators/rule/equals-operator.ts";
import { TraversingNodeVisitor } from "../../src/visitors/traversing-node-visitor.ts";

describe("TraversingNodeVisitor", () => {
  it("traverses the tree in post-order", () => {
    const root = new Group(new AndOperator());

    root.append(new Rule("country", new EqualsOperator(), "SE"));

    root.append(new Rule("active", new EqualsOperator(), true));

    class Visitor extends TraversingNodeVisitor<string[]> {
      protected override onGroup(group: Group, children: readonly string[][]): string[] {
        return [...children.flat(), `group:${group.operator.id}`];
      }

      protected override onRule(rule: Rule): string[] {
        return [`rule:${rule.field}`];
      }
    }

    const visitor = new Visitor();

    root.accept(visitor);

    expect(root.accept(visitor)).toEqual(["rule:country", "rule:active", "group:and"]);
  });
});
