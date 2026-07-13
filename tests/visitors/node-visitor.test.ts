import { describe, expect, it } from "vite-plus/test";
import { AndOperator } from "../../src/operators/group/and-operator.ts";
import { Group } from "../../src/nodes/group.ts";
import type { NodeVisitor } from "../../src/visitors/node-visitor.ts";
import { Rule } from "../../src/nodes/rule.ts";
import { EqualsOperator } from "../../src/operators/rule/equals-operator.ts";

describe("NodeVisitor", () => {
  it("visits a group", () => {
    const group = new Group(new AndOperator());

    const visitor: NodeVisitor<string> = {
      visitGroup: () => "group",
      visitRule: () => "rule",
    };

    expect(group.accept(visitor)).toBe("group");
  });

  it("visits a rule", () => {
    const rule = new Rule("country", new EqualsOperator(), "SE");

    const visitor: NodeVisitor<string> = {
      visitGroup: () => "group",
      visitRule: () => "rule",
    };

    expect(rule.accept(visitor)).toBe("rule");
  });
});
