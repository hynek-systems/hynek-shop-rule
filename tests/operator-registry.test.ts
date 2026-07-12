import { describe, expect, it } from "vite-plus/test";
import { NotEqualsOperator } from "../src/operators/rule/not-equals-operator.ts";
import { OperatorRegistry } from "../src/operators/operator-registry.ts";
import { EqualsOperator } from "../src/operators/rule/equals-operator.ts";

describe("OperatorRegistry", () => {
  it("registers operators by id", () => {
    const registry = new OperatorRegistry();

    registry.register(new EqualsOperator()).register(new NotEqualsOperator());

    expect(registry.get("=")).toBeInstanceOf(EqualsOperator);

    expect(registry.get("!=")).toBeInstanceOf(NotEqualsOperator);
  });
});
