import { Group } from "../nodes/group.ts";
import { Rule } from "../nodes/rule.ts";
import { RuleTree } from "../tree/rule-tree.ts";
import { TraversingNodeVisitor } from "../visitors/traversing-node-visitor.ts";

import type { FieldResolver } from "./field-resolver.ts";

export class RuleEvaluator<T = unknown> extends TraversingNodeVisitor<boolean> {
  public constructor(private readonly resolver: FieldResolver<T>) {
    super();
  }

  #subject!: T;

  public evaluate(tree: RuleTree, subject: T): boolean {
    this.#subject = subject;

    return tree.root.accept(this);
  }

  protected override onGroup(group: Group, children: readonly boolean[]): boolean {
    return group.operator.evaluate(children);
  }

  protected override onRule(rule: Rule): boolean {
    const left = this.resolver.resolve(this.#subject, rule.field);

    return rule.operator.evaluate(left, rule.value);
  }
}
