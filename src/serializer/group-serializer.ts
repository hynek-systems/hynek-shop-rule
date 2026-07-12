import { Group } from "../nodes/group.js";
import { Rule } from "../nodes/rule.js";

import { RuleSerializer } from "./rule-serializer.js";

import type { GroupDto, NodeDto } from "./types.js";

export class GroupSerializer {
  readonly #ruleSerializer = new RuleSerializer();

  public serialize(group: Group): GroupDto {
    return {
      type: "group",
      operator: group.operator.id,
      children: group.children.map((child) => this.serializeNode(child as any)),
    };
  }

  private serializeNode(node: Rule | Group): NodeDto {
    if (node instanceof Rule) {
      return this.#ruleSerializer.serialize(node);
    }

    return this.serialize(node);
  }
}
