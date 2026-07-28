import { describe, expect, it } from "vite-plus/test";
import {
  AndOperator,
  EqualsOperator,
  Field,
  GreaterThanOperator,
  NumberFieldType,
  ObjectFieldResolver,
  Rule,
  RuleContext,
  RuleEvaluator,
  RuleTree,
  RuleTreeCloner,
  RuleTreeValidator,
  StringFieldType,
} from "../src/index.ts";

describe("public API", () => {
  it("supports a complete consumer workflow", () => {
    const context = new RuleContext();

    context.groupOperators.register(new AndOperator());
    context.ruleOperators.register(new EqualsOperator());
    context.ruleOperators.register(new GreaterThanOperator());
    context.fields.register(new Field("country", "Country", StringFieldType));
    context.fields.register(new Field("price", "Price", NumberFieldType));

    const tree = new RuleTree();

    tree.root.append(Rule.field<string>("country").equals("SE"));
    tree.root.append(Rule.field<number>("price").greaterThan(100));

    expect(new RuleTreeValidator().validate(tree)).toEqual([]);

    const evaluator = new RuleEvaluator(new ObjectFieldResolver());

    expect(evaluator.evaluate(tree, { country: "SE", price: 150 })).toBe(true);

    const dto = tree.toJSON();
    const restored = context.fromJSON(dto);
    const clone = new RuleTreeCloner().clone(restored);

    expect(clone.toJSON()).toEqual(dto);
    expect(evaluator.evaluate(clone, { country: "NO", price: 150 })).toBe(false);
  });
});
