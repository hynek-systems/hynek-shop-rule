import type { RuleOperator } from "../operators/rule/rule-operator.ts";
import type { ValueControl } from "./value-control.ts";

export class FieldType<T> {
  public constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly control: (typeof ValueControl)[keyof typeof ValueControl],
    public readonly operators: readonly RuleOperator["id"][] = [],
  ) {}
}
