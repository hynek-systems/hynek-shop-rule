import { Rule } from "../nodes/rule.ts";
import { Range } from "../values/range.ts";

import type { RuleDto } from "./types.ts";

export class RuleSerializer {
  public serialize(rule: Rule): RuleDto {
    return {
      type: "rule",
      field: rule.field,
      operator: rule.operator.id,
      value: this.serializeOperand(rule.value),
    };
  }

  private serializeOperand(value: unknown): unknown {
    if (value instanceof Range) {
      return this.serializeRange(value);
    }

    return value;
  }

  private serializeRange(range: Range<unknown>): {
    from: unknown;
    to: unknown;
  } {
    return {
      from: range.from,
      to: range.to,
    };
  }
}
