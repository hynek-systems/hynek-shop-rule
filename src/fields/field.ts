export abstract class Field<T = unknown> {
  public constructor(
    public readonly id: string,
    public readonly label: string,
  ) {}
}
