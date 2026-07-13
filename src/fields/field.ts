import type { RuleOperator } from "../operators/rule/rule-operator.ts";
import type { FieldType } from "./field-type.ts";
export interface FieldOptions {
  category?: string;

  description?: string;

  icon?: string;

  operators?: readonly RuleOperator["id"][];
}

export class Field<T = unknown> {
  public constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly type: FieldType<T>,
    public readonly options: FieldOptions = {},
  ) {}
}
