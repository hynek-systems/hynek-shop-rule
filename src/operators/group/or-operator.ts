import { GroupOperator } from "./group-operator.js";

export class OrOperator extends GroupOperator {
  public readonly id = "or";

  public readonly label = "OR";
}
