import { describe, it, expect } from "vite-plus/test";
import { EndsWithOperator } from "../src/operators/rule/ends-with-operator.ts";
import { RuleContext } from "../src/rule-context.ts";
import { EqualsOperator } from "../src/operators/rule/equals-operator.ts";
import { ContainsOperator } from "../src/operators/rule/contains-operator.ts";
import { Field } from "../src/fields/field.ts";
import { StringFieldType } from "../src/fields/field-types.ts";
import { NotEqualsOperator } from "../src/operators/rule/not-equals-operator.ts";
import { StartsWithOperator } from "../src/operators/rule/starts-with-operator.ts";

describe("RuleContext", () => {
  it("returns the operators supported by a field", () => {
    const context = new RuleContext();

    context.ruleOperators.register(new EqualsOperator());

    context.ruleOperators.register(new ContainsOperator());

    const field = new Field("country", "Country", StringFieldType, {
      operators: ["=", "contains"],
    });

    expect(context.getOperators(field).map((operator) => operator.id)).toEqual(["=", "contains"]);
  });

  it("returns the operators supported by a field type when no operators are specified in the field options", () => {
    const context = new RuleContext();

    context.ruleOperators.register(new EqualsOperator());

    context.ruleOperators.register(new ContainsOperator());

    context.ruleOperators.register(new NotEqualsOperator());

    context.ruleOperators.register(new StartsWithOperator());

    context.ruleOperators.register(new EndsWithOperator());

    const field = new Field("country", "Country", StringFieldType);

    expect(context.getOperators(field).map((operator) => operator.id)).toEqual([
      "=",
      "!=",
      "contains",
      "starts_with",
      "ends_with",
    ]);
  });

  it("return an array of operators defined by the field", () => {
    const context = new RuleContext();

    context.ruleOperators.register(new EqualsOperator());

    context.ruleOperators.register(new ContainsOperator());

    const field = new Field("country", "Country", StringFieldType, {
      operators: ["="],
    });

    expect(context.getOperators(field).map((operator) => operator.id)).toEqual(["="]);
  });
});
