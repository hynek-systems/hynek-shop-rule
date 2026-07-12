export interface FieldResolver<T = unknown> {
  resolve(subject: T, field: string): unknown;
}
