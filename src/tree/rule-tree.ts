import { Group } from "../nodes/group.js";
import { AndOperator } from "../operators/group/and-operator.ts";

export class RuleTree {
  public readonly root = new Group(new AndOperator());
}
