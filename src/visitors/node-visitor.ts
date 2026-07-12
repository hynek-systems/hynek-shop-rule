import type { Group } from "../nodes/group.js";
import type { Rule } from "../nodes/rule.js";

export interface NodeVisitor<TResult = void> {
  visitGroup(group: Group): TResult;

  visitRule(rule: Rule): TResult;
}
