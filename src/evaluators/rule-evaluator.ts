import { Group } from "../nodes/group.js";
import { Rule } from "../nodes/rule.js";
import { AndOperator } from "../operators/group/and-operator.js";
import { OrOperator } from "../operators/group/or-operator.js";
import { RuleTree } from "../tree/rule-tree.js";

import type { FieldResolver } from "./field-resolver.js";

export class RuleEvaluator<T = unknown> {
  public constructor(private readonly resolver: FieldResolver<T>) {}

  public evaluate(tree: RuleTree, subject: T): boolean {
    return this.evaluateGroup(tree.root, subject);
  }

  private evaluateGroup(group: Group, subject: T): boolean {
    if (group.operator instanceof AndOperator) {
      for (const child of group.children) {
        if (!this.evaluateNode(child as any, subject)) {
          return false;
        }
      }

      return true;
    }

    if (group.operator instanceof OrOperator) {
      for (const child of group.children) {
        if (this.evaluateNode(child as any, subject)) {
          return true;
        }
      }

      return false;
    }

    throw new Error(`Unsupported group operator "${group.operator.id}".`);
  }

  private evaluateNode(node: Rule | Group, subject: T): boolean {
    if (node instanceof Rule) {
      return this.evaluateRule(node, subject);
    }

    return this.evaluateGroup(node, subject);
  }

  private evaluateRule(rule: Rule, subject: T): boolean {
    const value = this.resolver.resolve(subject, rule.field);

    return rule.operator.evaluate(value, rule.value);
  }
}
