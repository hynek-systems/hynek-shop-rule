import { describe, it, expect } from "vite-plus/test";
import { RuleContext } from "../src/rule-context.ts";
import { EqualsOperator } from "../src/operators/rule/equals-operator.ts";
import { ContainsOperator } from "../src/operators/rule/contains-operator.ts";
import { Field } from "../src/fields/field.ts";

describe("RuleContext", () => {
  it("returns the operators supported by a field", () => {
    const context = new RuleContext();

    context.ruleOperators.register(new EqualsOperator());

    context.ruleOperators.register(new ContainsOperator());

    const field = new Field("country", "Country", {
      operators: ["=", "contains"],
    });

    expect(context.getOperators(field).map((operator) => operator.id)).toEqual(["=", "contains"]);
  });
});
