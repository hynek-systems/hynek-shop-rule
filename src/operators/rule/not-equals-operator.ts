import { RuleOperator } from "./rule-operator.js";

export class NotEqualsOperator extends RuleOperator {
  public readonly id = "not_equals";

  public readonly label = "Not Equals";
}
