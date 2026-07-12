import { Group } from "../nodes/group.ts";
import { Rule } from "../nodes/rule.ts";
import { RuleTree } from "../tree/rule-tree.ts";
import { TraversingNodeVisitor } from "../visitors/traversing-node-visitor.ts";

import { ValidationError } from "./validation-error.ts";
import type { Validator } from "./validator.ts";

export class RuleTreeValidator extends TraversingNodeVisitor<void> implements Validator<RuleTree> {
  readonly #errors: ValidationError[] = [];

  public validate(tree: RuleTree): ValidationError[] {
    this.#errors.length = 0;

    tree.root.accept(this);

    return [...this.#errors];
  }

  protected override onGroup(group: Group, children: readonly void[]): void {
    if (group.children.length === 0) {
      this.#errors.push(new ValidationError(group, "A group must contain at least one child."));
    }
  }

  protected override onRule(rule: Rule): void {
    if (rule.field.trim().length === 0) {
      this.#errors.push(new ValidationError(rule, "A rule must specify a field."));
    }
  }
}
