import { describe, expect, it } from "vite-plus/test";
import {
  Field,
  FieldType,
  Group,
  OperandKind,
  Registry,
  Rule,
  RuleEvaluator,
  RuleOperator,
  RuleTree,
  TraversingNodeVisitor,
  ValueControl,
  type FieldResolver,
} from "../src/index.ts";

class DivisibleByOperator extends RuleOperator {
  public readonly id = "divisible_by";
  public readonly label = "Divisible by";
  public readonly operandKind = OperandKind.Single;

  public override isValidOperand(value: unknown): boolean {
    return typeof value === "number" && Number.isFinite(value) && value !== 0;
  }

  public evaluate(left: unknown, right: unknown): boolean {
    return (
      typeof left === "number" &&
      typeof right === "number" &&
      this.isValidOperand(right) &&
      left % right === 0
    );
  }
}

class MapFieldResolver implements FieldResolver<Map<string, unknown>> {
  public resolve(subject: Map<string, unknown>, field: string): unknown {
    return subject.get(field);
  }
}

class RuleCounter extends TraversingNodeVisitor<number> {
  protected onGroup(_group: Group, children: readonly number[]): number {
    return children.reduce((total, count) => total + count, 0);
  }

  protected onRule(_rule: Rule): number {
    return 1;
  }
}

class StringRegistry extends Registry<string, string> {
  protected keyOf(value: string): string {
    return value;
  }
}

describe("extension points", () => {
  it("supports custom field types, operators, resolvers, visitors, and registries", () => {
    const operator = new DivisibleByOperator();
    const integerType = new FieldType<number>(
      "integer",
      "Integer",
      ValueControl.Number,
      [operator.id],
      0,
    );
    const field = new Field("quantity", "Quantity", integerType);
    const tree = new RuleTree();

    tree.root.append(new Rule(field.id, operator, 3));

    const evaluator = new RuleEvaluator(new MapFieldResolver());
    const registry = new StringRegistry().register("custom");

    expect(evaluator.evaluate(tree, new Map([["quantity", 12]]))).toBe(true);
    expect(tree.root.accept(new RuleCounter())).toBe(1);
    expect(registry.get("custom")).toBe("custom");
  });
});
