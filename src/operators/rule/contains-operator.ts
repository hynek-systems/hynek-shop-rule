import { RuleOperator } from "./rule-operator.ts";

export class ContainsOperator extends RuleOperator {
  readonly id = "contains";

  readonly label = "Contains";
}
