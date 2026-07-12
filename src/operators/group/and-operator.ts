import { GroupOperator } from "./group-operator.ts";

export class AndOperator extends GroupOperator {
  public readonly id = "and";

  public readonly label = "AND";

  public evaluate(children: Iterable<boolean>): boolean {
    for (const child of children) {
      if (!child) {
        return false;
      }
    }

    return true;
  }
}
