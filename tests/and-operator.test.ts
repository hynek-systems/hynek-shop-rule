import { describe, it, expect } from "vite-plus/test";
import { AndOperator } from "../src/operators/group/and-operator.js";

describe("AndOperator", () => {
  it("short-circuits on false", () => {
    const operator = new AndOperator();

    let evaluated = false;

    const result = operator.evaluate(
      (function* () {
        yield true;
        yield false;

        evaluated = true;

        yield true;
      })(),
    );

    expect(result).toBe(false);

    expect(evaluated).toBe(false);
  });
});
