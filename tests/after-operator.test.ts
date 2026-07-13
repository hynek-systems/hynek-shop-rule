import { describe, expect, it } from "vite-plus/test";

import { AfterOperator } from "../src/operators/rule/after-operator.ts";

describe("AfterOperator", () => {
  it("returns true when left is after right", () => {
    expect(new AfterOperator().evaluate(new Date("2026-02-01"), new Date("2026-01-01"))).toBe(true);
  });

  it("returns false when dates are equal", () => {
    expect(new AfterOperator().evaluate(new Date("2026-01-01"), new Date("2026-01-01"))).toBe(
      false,
    );
  });

  it("returns false when left is before right", () => {
    expect(new AfterOperator().evaluate(new Date("2025-12-01"), new Date("2026-01-01"))).toBe(
      false,
    );
  });

  it("serializes its operand", () => {
    const operator = new AfterOperator();

    expect(operator.serializeOperand(new Date("2026-01-01T12:00:00.000Z"))).toBe(
      "2026-01-01T12:00:00.000Z",
    );
  });

  it("deserializes its operand", () => {
    const operator = new AfterOperator();

    const value = operator.deserializeOperand("2026-01-01T12:00:00.000Z");

    expect(value).toBeInstanceOf(Date);

    expect((value as Date).toISOString()).toBe("2026-01-01T12:00:00.000Z");
  });
});
