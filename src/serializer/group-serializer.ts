import { Group } from "../nodes/group.ts";
import { Rule } from "../nodes/rule.ts";

import { RuleSerializer } from "./rule-serializer.ts";

import type { GroupDto, NodeDto } from "./types.ts";

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
