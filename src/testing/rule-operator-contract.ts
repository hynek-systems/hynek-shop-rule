import { OperandKind } from "../operators/rule/operand-kind.ts";
import type { RuleOperator } from "../operators/rule/rule-operator.ts";

export interface RuleOperatorContractOptions {
  validOperands: readonly unknown[];

  invalidOperands?: readonly unknown[];
}

export function assertRuleOperatorContract(
  operator: RuleOperator,
  options: RuleOperatorContractOptions,
): void {
  if (operator.id.trim().length === 0) {
    throw new TypeError("A rule operator must have a non-empty ID.");
  }

  if (operator.label.trim().length === 0) {
    throw new TypeError("A rule operator must have a non-empty label.");
  }

  if (!Object.values(OperandKind).includes(operator.operandKind)) {
    throw new TypeError(`Rule operator "${operator.id}" has an invalid operand kind.`);
  }

  for (const operand of options.validOperands) {
    if (!operator.isValidOperand(operand)) {
      throw new TypeError(`Rule operator "${operator.id}" rejected a valid operand.`);
    }

    const restored = operator.deserializeOperand(operator.serializeOperand(operand));

    if (!operator.isValidOperand(restored)) {
      throw new TypeError(
        `Rule operator "${operator.id}" produced an invalid operand after serialization.`,
      );
    }
  }

  for (const operand of options.invalidOperands ?? []) {
    if (operator.isValidOperand(operand)) {
      throw new TypeError(`Rule operator "${operator.id}" accepted an invalid operand.`);
    }
  }
}
