export const OperandKind = {
  None: "None",
  Single: "Single",
  Multiple: "Multiple",
  Range: "Range",
} as const;

export type OperandKind = (typeof OperandKind)[keyof typeof OperandKind];
