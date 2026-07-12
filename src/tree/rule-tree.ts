import { Group } from "../nodes/group.ts";
import { AndOperator } from "../operators/group/and-operator.ts";
import { RuleTreeSerializer } from "../serializer/rule-tree-serializer.ts";
import type { RuleTreeDto } from "../serializer/types.ts";

export class RuleTree {
  constructor(public readonly root = new Group(new AndOperator())) {}

  public toJSON(): RuleTreeDto {
    return new RuleTreeSerializer().serialize(this);
  }
}
