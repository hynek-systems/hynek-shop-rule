import { describe, expect, it } from "vite-plus/test";

import { LessThanOrEqualOperator } from "../src/operators/rule/less-than-or-equal-operator.js";

describe("LessThanOrEqualOperator", () => {
  it("returns true when left is less than right", () => {
    expect(new LessThanOrEqualOperator().evaluate(5, 10)).toBe(true);
  });

  it("returns true when values are equal", () => {
    expect(new LessThanOrEqualOperator().evaluate(10, 10)).toBe(true);
  });

  it("returns false when left is greater than right", () => {
    expect(new LessThanOrEqualOperator().evaluate(20, 10)).toBe(false);
  });
});
