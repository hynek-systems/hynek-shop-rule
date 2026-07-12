import { describe, it, expect } from "vite-plus/test";
import { OrOperator } from "../src/operators/group/or-operator.js";

describe("OrOperator", () => {
  it("short-circuits on true", () => {
    const operator = new OrOperator();

    let evaluated = false;

    const result = operator.evaluate(
      (function* () {
        yield false;
        yield true;

        evaluated = true;

        yield false;
      })(),
    );

    expect(result).toBe(true);

    expect(evaluated).toBe(false);
  });
});
