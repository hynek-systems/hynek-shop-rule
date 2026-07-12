import { Operator } from "./operator.ts";

import { Registry } from "../support/registry.ts";

export class OperatorRegistry<TOperator extends Operator = Operator> extends Registry<
  string,
  TOperator
> {
  protected keyOf(operator: TOperator): string {
    return operator.id;
  }
}
