import { describe, expect, it } from "vite-plus/test";
import { BetweenOperator } from "../src/operators/rule/between-operator.ts";
import { Range } from "../src/values/range.ts";

describe("BetweenOperator", () => {
  it("returns true for values inside the range", () => {
    expect(new BetweenOperator().evaluate(15, new Range(10, 20))).toBe(true);
  });

  it("returns true for the lower bound", () => {
    expect(new BetweenOperator().evaluate(10, new Range(10, 20))).toBe(true);
  });

  it("returns true for the upper bound", () => {
    expect(new BetweenOperator().evaluate(20, new Range(10, 20))).toBe(true);
  });

  it("returns false outside the range", () => {
    expect(new BetweenOperator().evaluate(21, new Range(10, 20))).toBe(false);
  });
});
