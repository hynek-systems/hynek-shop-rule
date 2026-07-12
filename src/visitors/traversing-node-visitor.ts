import { Group } from "../nodes/group.js";
import { Rule } from "../nodes/rule.js";

import type { NodeVisitor } from "./node-visitor.js";

export abstract class TraversingNodeVisitor<TResult> implements NodeVisitor<TResult> {
  public visitGroup(group: Group): TResult {
    const children = group.children.map((child) => child.accept(this));

    return this.onGroup(group, children);
  }

  public visitRule(rule: Rule): TResult {
    return this.onRule(rule);
  }

  protected abstract onGroup(group: Group, children: readonly TResult[]): TResult;

  protected abstract onRule(rule: Rule): TResult;
}
