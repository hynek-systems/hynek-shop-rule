import { describe, expect, it } from "vite-plus/test";
import { EndsWithOperator } from "../src/operators/rule/ends-with-operator.ts";
import { ObjectFieldResolver } from "../src/evaluators/object-field-resolver.ts";
import { RuleEvaluator } from "../src/evaluators/rule-evaluator.ts";
import { Rule } from "../src/nodes/rule.ts";
import { RuleTree } from "../src/tree/rule-tree.ts";

describe("EndsWithOperator", () => {
  it("returns true when the value ends with the operand", () => {
    expect(new EndsWithOperator().evaluate("Andersson", "son")).toBe(true);
  });

  it("returns false otherwise", () => {
    expect(new EndsWithOperator().evaluate("Andersson", "And")).toBe(false);
  });

  it("evaluates endsWith", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field<string>("name").endsWith("son"));

    const evaluator = new RuleEvaluator(new ObjectFieldResolver());

    expect(
      evaluator.evaluate(tree, {
        name: "Andersson",
      }),
    ).toBe(true);
  });
});
