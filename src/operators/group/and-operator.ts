import { GroupOperator } from "./group-operator.js";

export class AndOperator extends GroupOperator {
  public readonly id = "and";

  public readonly label = "AND";
}
