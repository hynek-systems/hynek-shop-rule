import type { RuleOperator } from "../operators/rule/rule-operator.ts";

export interface FieldOptions {
  category?: string;

  description?: string;

  icon?: string;

  operators?: readonly RuleOperator["id"][];
}

export class Field {
  public constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly options: FieldOptions = {},
  ) {}
}
