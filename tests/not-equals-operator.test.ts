import { describe, expect, it } from "vite-plus/test";
import { NotEqualsOperator } from "../src/operators/rule/not-equals-operator.ts";

describe("NotEqualsOperator", () => {
  it("returns true for different values", () => {
    const operator = new NotEqualsOperator();

    expect(operator.evaluate("SE", "NO")).toBe(true);
  });

  it("returns false for equal values", () => {
    const operator = new NotEqualsOperator();

    expect(operator.evaluate("SE", "SE")).toBe(false);
  });
});
