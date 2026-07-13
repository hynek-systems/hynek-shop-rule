import { describe, expect, it } from "vite-plus/test";

import { GreaterThanOperator } from "../../src/operators/rule/greater-than-operator.ts";
import { RuleEvaluator } from "../../src/evaluators/rule-evaluator.ts";
import { ObjectFieldResolver } from "../../src/evaluators/object-field-resolver.ts";
import { RuleTree } from "../../src/tree/rule-tree.ts";
import { Rule } from "../../src/nodes/rule.ts";

describe("GreaterThanOperator", () => {
  it("returns true when left is greater than right", () => {
    expect(new GreaterThanOperator().evaluate(20, 10)).toBe(true);
  });

  it("returns false when left is equal to right", () => {
    expect(new GreaterThanOperator().evaluate(10, 10)).toBe(false);
  });

  it("returns false when left is less than right", () => {
    expect(new GreaterThanOperator().evaluate(5, 10)).toBe(false);
  });

  it("evaluates greaterThan", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field<number>("price").greaterThan(100));

    const evaluator = new RuleEvaluator(new ObjectFieldResolver());

    expect(
      evaluator.evaluate(tree, {
        price: 150,
      }),
    ).toBe(true);

    expect(
      evaluator.evaluate(tree, {
        price: 100,
      }),
    ).toBe(false);
  });
});
