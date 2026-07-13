import { describe, expect, it } from "vite-plus/test";
import { EqualsOperator } from "../../src/operators/rule/equals-operator.ts";

describe("EqualsOperator", () => {
  it("returns true for equal values", () => {
    const operator = new EqualsOperator();

    expect(operator.evaluate("SE", "SE")).toBe(true);
  });

  it("returns false for different values", () => {
    const operator = new EqualsOperator();

    expect(operator.evaluate("SE", "NO")).toBe(false);
  });
});
