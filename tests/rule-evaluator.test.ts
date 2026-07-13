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

  it("evaluates lessThanOrEqual", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field<number>("price").lessThanOrEqual(100));

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
    ).toBe(true);

    expect(
      evaluator.evaluate(tree, {
        price: 150,
      }),
    ).toBe(false);
  });

  it("evaluates between", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field<number>("price").between(100, 200));

    const evaluator = new RuleEvaluator(new ObjectFieldResolver());

    expect(
      evaluator.evaluate(tree, {
        price: 150,
      }),
    ).toBe(true);

    expect(
      evaluator.evaluate(tree, {
        price: 99,
      }),
    ).toBe(false);

    expect(
      evaluator.evaluate(tree, {
        price: 201,
      }),
    ).toBe(false);
  });

  it("evaluates before", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field<Date>("createdAt").before(new Date("2026-01-01")));

    const evaluator = new RuleEvaluator(new ObjectFieldResolver());

    expect(
      evaluator.evaluate(tree, {
        createdAt: new Date("2025-12-31"),
      }),
    ).toBe(true);

    expect(
      evaluator.evaluate(tree, {
        createdAt: new Date("2026-01-01"),
      }),
    ).toBe(false);
  });

  it("evaluates after", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field<Date>("createdAt").after(new Date("2026-01-01")));

    const evaluator = new RuleEvaluator(new ObjectFieldResolver());

    expect(
      evaluator.evaluate(tree, {
        createdAt: new Date("2026-02-01"),
      }),
    ).toBe(true);

    expect(
      evaluator.evaluate(tree, {
        createdAt: new Date("2026-01-01"),
      }),
    ).toBe(false);
  });
});
