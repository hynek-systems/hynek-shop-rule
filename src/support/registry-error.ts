export const RegistryErrorCode = {
  DuplicateKey: "DUPLICATE_KEY",
  UnknownKey: "UNKNOWN_KEY",
} as const;

export type RegistryErrorCode = (typeof RegistryErrorCode)[keyof typeof RegistryErrorCode];

export class RegistryError extends Error {
  public override readonly name = "RegistryError";

  public constructor(
    public readonly code: RegistryErrorCode,
    public readonly key: PropertyKey,
    message: string,
  ) {
    super(message);
  }
}
