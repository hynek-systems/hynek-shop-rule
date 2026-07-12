import { describe, expect, it } from "vite-plus/test";
import { RuleEvaluator } from "../src/evaluators/rule-evaluator.js";
import { ObjectFieldResolver } from "../src/evaluators/object-field-resolver.js";
import { RuleTree } from "../src/tree/rule-tree.js";
import { Rule } from "../src/nodes/rule.js";

describe("RuleEvaluator", () => {
  it("evaluates an AND group", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field("country").equals("SE"));

    tree.root.append(Rule.field("active").equals(true));

    const evaluator = new RuleEvaluator(new ObjectFieldResolver());

    expect(
      evaluator.evaluate(tree, {
        country: "SE",
        active: true,
      }),
    ).toBe(true);
  });

  it("returns false when a rule fails", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field("country").equals("SE"));

    const evaluator = new RuleEvaluator(new ObjectFieldResolver());

    expect(
      evaluator.evaluate(tree, {
        country: "NO",
      }),
    ).toBe(false);
  });
});
