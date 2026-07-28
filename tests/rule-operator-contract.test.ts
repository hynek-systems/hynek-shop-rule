import { describe, expect, it } from "vite-plus/test";
import {
  BetweenOperator,
  GreaterThanOperator,
  Range,
  assertRuleOperatorContract,
} from "../src/index.ts";

describe("assertRuleOperatorContract", () => {
  it("accepts an operator that honors its operand contract", () => {
    expect(() =>
      assertRuleOperatorContract(new BetweenOperator(), {
        validOperands: [new Range(1, 2), new Range(new Date(0), new Date(1))],
        invalidOperands: [new Range(2, 1), null],
      }),
    ).not.toThrow();
  });

  it("reports operands incorrectly declared as valid", () => {
    expect(() =>
      assertRuleOperatorContract(new GreaterThanOperator(), {
        validOperands: ["10"],
      }),
    ).toThrowError('Rule operator "greater_than" rejected a valid operand.');
  });
});
