import { Rule } from "../nodes/rule.js";

import type { RuleDto } from "./types.js";

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
