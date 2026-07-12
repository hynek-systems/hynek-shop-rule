import type { Group } from "../nodes/group.ts";
import type { Rule } from "../nodes/rule.ts";

export interface NodeVisitor<TResult = void> {
  visitGroup(group: Group): TResult;

  visitRule(rule: Rule): TResult;
}
