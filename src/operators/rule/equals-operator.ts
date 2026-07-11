import { RuleOperator } from "./rule-operator.ts";

export class EqualsOperator extends RuleOperator {
  readonly id = "=";

  readonly label = "Equals";
}
