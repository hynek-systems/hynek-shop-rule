import { FieldCollection } from "./fields/field-collection.ts";
import type { Field } from "./fields/field.ts";
import { GroupOperator } from "./operators/group/group-operator.ts";
import { OperatorRegistry } from "./operators/operator-registry.ts";
import { RuleOperator } from "./operators/rule/rule-operator.ts";
import { RuleTreeDeserializer } from "./serializer/rule-tree-deserializer.ts";
import type { RuleTreeDto } from "./serializer/types.ts";
import type { RuleTree } from "./tree/rule-tree.ts";

export class RuleContext {
  public readonly groupOperators = new OperatorRegistry<GroupOperator>();

  public readonly ruleOperators = new OperatorRegistry<RuleOperator>();

  public readonly fields = new FieldCollection();

  public getOperators(field: Field): RuleOperator[] {
    const ids = field.options.operators ?? field.type.operators;

    return ids.map((id) => this.ruleOperators.get(id));
  }

  public fromJSON(dto: RuleTreeDto): RuleTree {
    return new RuleTreeDeserializer(this).deserialize(dto);
  }
}
