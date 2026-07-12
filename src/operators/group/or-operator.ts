import { GroupOperator } from "./group-operator.ts";

export class OrOperator extends GroupOperator {
  public readonly id = "or";

  public readonly label = "OR";

  public evaluate(children: Iterable<boolean>): boolean {
    for (const child of children) {
      if (child) {
        return true;
      }
    }

    return false;
  }
}
