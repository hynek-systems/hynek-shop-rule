import { describe, expect, it } from "vite-plus/test";

import { LessThanOperator } from "../../src/operators/rule/less-than-operator.ts";
import { RuleTree } from "../../src/tree/rule-tree.ts";
import { Rule } from "../../src/nodes/rule.ts";
import { RuleEvaluator } from "../../src/evaluators/rule-evaluator.ts";
import { ObjectFieldResolver } from "../../src/evaluators/object-field-resolver.ts";

describe("LessThanOperator", () => {
  it("returns true when left is less than right", () => {
    expect(new LessThanOperator().evaluate(5, 10)).toBe(true);
  });

  it("returns false when values are equal", () => {
    expect(new LessThanOperator().evaluate(10, 10)).toBe(false);
  });

  it("returns false when left is greater than right", () => {
    expect(new LessThanOperator().evaluate(20, 10)).toBe(false);
  });

  it("evaluates lessThan", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field<number>("price").lessThan(100));

    const evaluator = new RuleEvaluator(new ObjectFieldResolver());

    expect(
      evaluator.evaluate(tree, {
        price: 50,
      }),
    ).toBe(true);

    expect(
      evaluator.evaluate(tree, {
        price: 100,
      }),
    ).toBe(false);

    expect(
      evaluator.evaluate(tree, {
        price: 150,
      }),
    ).toBe(false);
  });
});
