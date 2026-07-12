import { describe, expect, it } from "vite-plus/test";

import { GreaterThanOrEqualOperator } from "../src/operators/rule/greater-than-or-equal-operator.ts";
import { RuleTree } from "../src/tree/rule-tree.ts";
import { Rule } from "../src/nodes/rule.ts";
import { RuleEvaluator } from "../src/evaluators/rule-evaluator.ts";
import { ObjectFieldResolver } from "../src/evaluators/object-field-resolver.ts";

describe("GreaterThanOrEqualOperator", () => {
  it("returns true when left is greater than right", () => {
    expect(new GreaterThanOrEqualOperator().evaluate(20, 10)).toBe(true);
  });

  it("returns true when values are equal", () => {
    expect(new GreaterThanOrEqualOperator().evaluate(10, 10)).toBe(true);
  });

  it("returns false when left is less than right", () => {
    expect(new GreaterThanOrEqualOperator().evaluate(5, 10)).toBe(false);
  });

  it("evaluates greaterThanOrEqual", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field<number>("price").greaterThanOrEqual(100));

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
    ).toBe(true);

    expect(
      evaluator.evaluate(tree, {
        price: 99,
      }),
    ).toBe(false);
  });
});
