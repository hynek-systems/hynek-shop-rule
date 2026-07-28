import { Group } from "../nodes/group.ts";
import type { Node } from "../nodes/node.ts";
import { Rule } from "../nodes/rule.ts";

import { RuleSerializer } from "./rule-serializer.ts";

import type { GroupDto, NodeDto } from "./types.ts";

export class GroupSerializer {
  readonly #ruleSerializer = new RuleSerializer();

  public serialize(group: Group): GroupDto {
    return {
      type: "group",
      operator: group.operator.id,
      children: group.children.map((child) => this.serializeNode(child)),
    };
  }

  private serializeNode(node: Node): NodeDto {
    if (node instanceof Rule) {
      return this.#ruleSerializer.serialize(node);
    }

    if (node instanceof Group) {
      return this.serialize(node);
    }

    throw new TypeError(`Unsupported rule tree node "${node.constructor.name}".`);
  }
}
