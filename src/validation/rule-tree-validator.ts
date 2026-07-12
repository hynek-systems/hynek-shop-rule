import { Group } from "../nodes/group.js";
import { Rule } from "../nodes/rule.js";
import { RuleTree } from "../tree/rule-tree.js";
import { TraversingNodeVisitor } from "../visitors/traversing-node-visitor.js";

import { ValidationError } from "./validation-error.js";
import type { Validator } from "./validator.js";

export class RuleTreeValidator extends TraversingNodeVisitor<void> implements Validator<RuleTree> {
  readonly #errors: ValidationError[] = [];

  public validate(tree: RuleTree): ValidationError[] {
    this.#errors.length = 0;

    tree.root.accept(this);

    return [...this.#errors];
  }

  protected override onGroup(group: Group): void {
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
