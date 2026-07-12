import { Group } from "../nodes/group.ts";
import { Rule } from "../nodes/rule.ts";

import type { NodeVisitor } from "./node-visitor.ts";

export abstract class TraversingNodeVisitor<TResult = void> implements NodeVisitor<TResult> {
  public visitGroup(group: Group): TResult {
    for (const child of group.children) {
      child.accept(this);
    }

    return this.onGroup(group);
  }

  public visitRule(rule: Rule): TResult {
    return this.onRule(rule);
  }

  protected onGroup(group: Group): TResult {
    return undefined as TResult;
  }

  protected onRule(rule: Rule): TResult {
    return undefined as TResult;
  }
}
