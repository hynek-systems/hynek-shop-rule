import { GroupOperator } from "./operators/group/group-operator.js";
import { OperatorRegistry } from "./operators/operator-registry.js";
import { RuleOperator } from "./operators/rule/rule-operator.js";
import { RuleTreeDeserializer } from "./serializer/rule-tree-deserializer.ts";
import type { RuleTreeDto } from "./serializer/types.ts";
import type { RuleTree } from "./tree/rule-tree.ts";

export class RuleContext {
  public readonly groupOperators = new OperatorRegistry<GroupOperator>();

  public readonly ruleOperators = new OperatorRegistry<RuleOperator>();

  public fromJSON(dto: RuleTreeDto): RuleTree {
    return new RuleTreeDeserializer(this).deserialize(dto);
  }
}
