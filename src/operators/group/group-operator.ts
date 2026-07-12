import { Operator } from "../operator.ts";

export abstract class GroupOperator extends Operator {
  public abstract evaluate(children: Iterable<boolean>): boolean;
}
