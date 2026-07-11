import { Node } from "./node.js";

import type { RuleOperator } from "../operators/rule/rule-operator.ts";

export class Rule extends Node {
  public constructor(
    public readonly field: string,
    public readonly operator: RuleOperator,
    public readonly value: unknown,
  ) {
    super();
  }
}
