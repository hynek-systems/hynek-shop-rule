import { Rule } from "../nodes/rule.ts";

import type { RuleDto } from "./types.ts";

export class RuleSerializer {
  public serialize(rule: Rule): RuleDto {
    return {
      type: "rule",
      field: rule.field,
      operator: rule.operator.id,
      value: rule.value,
    };
  }
}
