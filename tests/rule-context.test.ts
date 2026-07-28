import { describe, it, expect } from "vite-plus/test";
import { EndsWithOperator } from "../src/operators/rule/ends-with-operator.ts";
import { RuleContext } from "../src/rule-context.ts";
import { EqualsOperator } from "../src/operators/rule/equals-operator.ts";
import { ContainsOperator } from "../src/operators/rule/contains-operator.ts";
import { Field } from "../src/fields/field.ts";
import { StringFieldType } from "../src/fields/field-types.ts";
import { NotEqualsOperator } from "../src/operators/rule/not-equals-operator.ts";
import { StartsWithOperator } from "../src/operators/rule/starts-with-operator.ts";
import { GreaterThanOperator } from "../src/operators/rule/greater-than-operator.ts";
import { NumberFieldType } from "../src/fields/field-types.ts";
import { RuleCreationError, RuleCreationErrorCode } from "../src/builders/rule-creation-error.ts";

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

  it("creates a rule from registered field and operator contracts", () => {
    const context = new RuleContext();
    context.fields.register(new Field("price", "Price", NumberFieldType));
    context.ruleOperators.register(new GreaterThanOperator());

    const rule = context.createRule("price", "greater_than", 100);

    expect(rule).toMatchObject({ field: "price", value: 100 });
    expect(rule.operator).toBeInstanceOf(GreaterThanOperator);
  });

  it.each([
    {
      name: "unsupported operators",
      operator: new ContainsOperator(),
      value: "10",
      code: RuleCreationErrorCode.UnsupportedOperator,
    },
    {
      name: "invalid operands",
      operator: new GreaterThanOperator(),
      value: "100",
      code: RuleCreationErrorCode.InvalidOperand,
    },
  ])("rejects $name when creating a rule", ({ operator, value, code }) => {
    const context = new RuleContext();
    context.fields.register(new Field("price", "Price", NumberFieldType));
    context.ruleOperators.register(operator);

    expect(() => context.createRule("price", operator.id, value)).toThrowError(
      expect.objectContaining<Partial<RuleCreationError>>({ code }),
    );
  });
});
