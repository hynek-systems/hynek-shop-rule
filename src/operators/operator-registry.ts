import { Operator } from "./operator.js";

import { Registry } from "../support/registry.js";

export class OperatorRegistry<TOperator extends Operator = Operator> extends Registry<
  string,
  TOperator
> {
  protected keyOf(operator: TOperator): string {
    return operator.id;
  }
}
