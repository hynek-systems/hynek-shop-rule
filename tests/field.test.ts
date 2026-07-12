import { describe, it, expect } from "vite-plus/test";
import { Field } from "../src/fields/field.ts";
import { Rule } from "../src/nodes/rule.ts";
import { FieldExpression } from "../src/builders/field-expression.ts";

describe("Field", () => {
  it("should return an instance of FieldExpression when calling Rule.field with a string", () => {
    const field = new Field<string>("country", "Country");

    const expression = Rule.field(field);

    expect(expression).toBeInstanceOf(FieldExpression);
  });
});
