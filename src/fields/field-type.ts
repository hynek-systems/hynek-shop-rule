import type { RuleOperator } from "../operators/rule/rule-operator.ts";

export class FieldType<T> {
  public constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly operators: readonly RuleOperator["id"][] = [],
  ) {}
}
