import { Group } from "../nodes/group.js";
import { Rule } from "../nodes/rule.js";
import { RuleTree } from "../tree/rule-tree.js";
import { TraversingNodeVisitor } from "../visitors/traversing-node-visitor.js";

export class RuleTreeCloner extends TraversingNodeVisitor<Group | Rule> {
  public clone(tree: RuleTree): RuleTree {
    const root = tree.root.accept(this);

    if (!(root instanceof Group)) {
      throw new Error("The root node must be a group.");
    }

    return new RuleTree(root);
  }

  protected override onGroup(group: Group, children: readonly (Group | Rule)[]): Group {
    const clone = new Group(group.operator);

    for (const child of children) {
      clone.append(child);
    }

    return clone;
  }

  protected override onRule(rule: Rule): Rule {
    return new Rule(rule.field, rule.operator, rule.value);
  }
}
