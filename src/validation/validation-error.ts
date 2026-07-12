import { Node } from "../nodes/node.js";

export class ValidationError {
  public constructor(
    public readonly node: Node,
    public readonly message: string,
  ) {}
}
