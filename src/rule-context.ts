import { GroupOperator } from "./operators/group/group-operator.js";
import { OperatorRegistry } from "./operators/operator-registry.js";
import { RuleOperator } from "./operators/rule/rule-operator.js";

export class RuleContext {
  public readonly groupOperators = new OperatorRegistry<GroupOperator>();

  public readonly ruleOperators = new OperatorRegistry<RuleOperator>();
}
