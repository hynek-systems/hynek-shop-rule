export const RuleCreationErrorCode = {
  UnsupportedOperator: "UNSUPPORTED_OPERATOR",
  InvalidOperand: "INVALID_OPERAND",
} as const;

export type RuleCreationErrorCode =
  (typeof RuleCreationErrorCode)[keyof typeof RuleCreationErrorCode];

export class RuleCreationError extends Error {
  public override readonly name = "RuleCreationError";

  public constructor(
    public readonly code: RuleCreationErrorCode,
    message: string,
  ) {
    super(message);
  }
}
