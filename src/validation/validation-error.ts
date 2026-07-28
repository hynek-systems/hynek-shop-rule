import { Node } from "../nodes/node.ts";

export const ValidationErrorCode = {
  EmptyGroup: "EMPTY_GROUP",
  MissingField: "MISSING_FIELD",
} as const;

export type ValidationErrorCode = (typeof ValidationErrorCode)[keyof typeof ValidationErrorCode];

export class ValidationError {
  public constructor(
    public readonly node: Node,
    public readonly code: ValidationErrorCode,
    public readonly path: string,
    public readonly message: string,
  ) {}
}
