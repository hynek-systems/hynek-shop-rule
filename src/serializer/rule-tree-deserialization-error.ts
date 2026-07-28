export const RuleTreeDeserializationErrorCode = {
  InvalidDto: "INVALID_DTO",
  UnsupportedVersion: "UNSUPPORTED_VERSION",
  UnknownGroupOperator: "UNKNOWN_GROUP_OPERATOR",
  UnknownRuleOperator: "UNKNOWN_RULE_OPERATOR",
  UnknownField: "UNKNOWN_FIELD",
  InvalidOperand: "INVALID_OPERAND",
} as const;

export type RuleTreeDeserializationErrorCode =
  (typeof RuleTreeDeserializationErrorCode)[keyof typeof RuleTreeDeserializationErrorCode];

export class RuleTreeDeserializationError extends Error {
  public override readonly name = "RuleTreeDeserializationError";

  public constructor(
    public readonly code: RuleTreeDeserializationErrorCode,
    public readonly path: string,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}
