import { FieldCollection } from "./fields/field-collection.ts";
import type { Field } from "./fields/field.ts";
import { Rule } from "./nodes/rule.ts";
import { AndOperator } from "./operators/group/and-operator.ts";
import { GroupOperator } from "./operators/group/group-operator.ts";
import { OperatorRegistry } from "./operators/operator-registry.ts";
import { RuleOperator } from "./operators/rule/rule-operator.ts";
import { RuleTreeDeserializer } from "./serializer/rule-tree-deserializer.ts";
import type { RuleTree } from "./tree/rule-tree.ts";
import { RuleCreationError, RuleCreationErrorCode } from "./builders/rule-creation-error.ts";

export class RuleContext {
  public readonly groupOperators = new OperatorRegistry<GroupOperator>();

  public readonly ruleOperators = new OperatorRegistry<RuleOperator>();

  public readonly fields = new FieldCollection();

  public readonly defaultGroupOperator = new AndOperator();

  public getOperators(field: Field): RuleOperator[] {
    const ids = field.options.operators ?? field.type.operators;

    return ids.map((id) => this.ruleOperators.get(id));
  }

  public createRule(fieldId: string, operatorId: string, value: unknown): Rule {
    const field = this.fields.get(fieldId);
    const operator = this.ruleOperators.get(operatorId);
    const supportedOperatorIds = field.options.operators ?? field.type.operators;

    if (!supportedOperatorIds.includes(operatorId)) {
      throw new RuleCreationError(
        RuleCreationErrorCode.UnsupportedOperator,
        `Operator "${operatorId}" is not supported by field "${fieldId}".`,
      );
    }

    if (!operator.isValidOperand(value)) {
      throw new RuleCreationError(
        RuleCreationErrorCode.InvalidOperand,
        `Invalid operand for operator "${operatorId}".`,
      );
    }

    return new Rule(fieldId, operator, value);
  }

  public fromJSON(dto: unknown): RuleTree {
    return new RuleTreeDeserializer(this).deserialize(dto);
  }
}
