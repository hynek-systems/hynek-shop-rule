export interface FieldOptions {
  category?: string;

  description?: string;

  icon?: string;
}

export class Field {
  public constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly options: FieldOptions = {},
  ) {}
}
