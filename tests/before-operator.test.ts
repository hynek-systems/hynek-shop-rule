import { describe, expect, it } from "vite-plus/test";

import { BeforeOperator } from "../src/operators/rule/before-operator.ts";

describe("BeforeOperator", () => {
  it("returns true when the date is before", () => {
    expect(new BeforeOperator().evaluate(new Date("2026-01-01"), new Date("2026-02-01"))).toBe(
      true,
    );
  });

  it("returns false when the dates are equal", () => {
    expect(new BeforeOperator().evaluate(new Date("2026-01-01"), new Date("2026-01-01"))).toBe(
      false,
    );
  });

  it("returns false when the date is after", () => {
    expect(new BeforeOperator().evaluate(new Date("2026-03-01"), new Date("2026-02-01"))).toBe(
      false,
    );
  });
});
