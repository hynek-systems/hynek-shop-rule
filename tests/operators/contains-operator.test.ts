import { describe, expect, it } from "vite-plus/test";
import { ContainsOperator } from "../../src/operators/rule/contains-operator.ts";

describe("ContainsOperator", () => {
  it("returns true when the left string contains the right string", () => {
    const operator = new ContainsOperator();

    expect(operator.evaluate("Hello, world!", "world")).toBe(true);
  });

  it("returns false when the left string does not contain the right string", () => {
    const operator = new ContainsOperator();

    expect(operator.evaluate("Hello, world!", "planet")).toBe(false);
  });
});
