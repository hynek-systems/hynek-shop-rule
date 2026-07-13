import { describe, expect, it } from "vite-plus/test";
import { StartsWithOperator } from "../../src/operators/rule/starts-with-operator.ts";
import { ObjectFieldResolver } from "../../src/evaluators/object-field-resolver.ts";
import { RuleEvaluator } from "../../src/evaluators/rule-evaluator.ts";
import { RuleTree } from "../../src/tree/rule-tree.ts";
import { Rule } from "../../src/nodes/rule.ts";

describe("StartsWithOperator", () => {
  it("returns true when the value starts with the operand", () => {
    expect(new StartsWithOperator().evaluate("Henrik", "Hen")).toBe(true);
  });

  it("returns false otherwise", () => {
    expect(new StartsWithOperator().evaluate("Henrik", "rik")).toBe(false);
  });

  it("evaluates startsWith", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field<string>("name").startsWith("Hen"));

    const evaluator = new RuleEvaluator(new ObjectFieldResolver());

    expect(
      evaluator.evaluate(tree, {
        name: "Henrik",
      }),
    ).toBe(true);
  });
});
