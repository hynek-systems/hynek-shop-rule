import { Group } from "../nodes/group.js";
import { AndOperator } from "../operators/group/and-operator.ts";
import type { RuleContext } from "../rule-context.ts";
import { RuleTreeDeserializer } from "../serializer/rule-tree-deserializer.ts";
import { RuleTreeSerializer } from "../serializer/rule-tree-serializer.ts";
import type { RuleTreeDto } from "../serializer/types.ts";

export class RuleTree {
  constructor(public readonly root = new Group(new AndOperator())) {}

  public toJSON(): RuleTreeDto {
    return new RuleTreeSerializer().serialize(this);
  }

  public static fromJSON(dto: RuleTreeDto, context: RuleContext): RuleTree {
    return new RuleTreeDeserializer(context).deserialize(dto);
  }
}
