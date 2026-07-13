import { describe, it, expect } from "vite-plus/test";
import { Field } from "../src/fields/field.ts";
import { Rule } from "../src/nodes/rule.ts";
import { FieldExpression } from "../src/builders/field-expression.ts";

describe("Field", () => {
  it("should return an instance of FieldExpression when calling Rule.field with a string", () => {
    const field = new Field("country", "Country");

    const expression = Rule.field(field);

    expect(expression).toBeInstanceOf(FieldExpression);
  });

  it("stores metadata", () => {
    const field = new Field("price", "Price", {
      category: "Product",
      description: "Current product price",
      icon: "currency",
    });

    expect(field.options.category).toBe("Product");

    expect(field.options.description).toBe("Current product price");

    expect(field.options.icon).toBe("currency");
  });
});
