import { Group } from "../nodes/group.js";
import { Node } from "../nodes/node.js";
import { Rule } from "../nodes/rule.js";
import { RuleTree } from "../tree/rule-tree.js";

import { ValidationError } from "./validation-error.js";
import type { Validator } from "./validator.js";

export class RuleTreeValidator implements Validator<RuleTree> {
  public validate(tree: RuleTree): ValidationError[] {
    const errors: ValidationError[] = [];

    this.validateNode(tree.root, errors);

    return errors;
  }

  private validateNode(node: Node, errors: ValidationError[]): void {
    if (node instanceof Group) {
      this.validateGroup(node, errors);

      return;
    } else if (node instanceof Rule) {
      this.validateRule(node, errors);
    }
  }

  private validateGroup(group: Group, errors: ValidationError[]): void {
    if (group.children.length === 0) {
      errors.push(new ValidationError(group, "A group must contain at least one child."));
    }

    for (const child of group.children) {
      this.validateNode(child, errors);
    }
  }

  private validateRule(rule: Rule, errors: ValidationError[]): void {
    if (rule.field.trim().length === 0) {
      errors.push(new ValidationError(rule, "A rule must specify a field."));
    }
  }
}
