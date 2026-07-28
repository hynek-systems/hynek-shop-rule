import { Field } from "./field.ts";
import { RegistryError, RegistryErrorCode } from "../support/registry-error.ts";

export class FieldCollection implements Iterable<Field> {
  readonly #fields = new Map<string, Field>();

  public register(field: Field): this {
    if (this.#fields.has(field.id)) {
      throw new RegistryError(
        RegistryErrorCode.DuplicateKey,
        field.id,
        `Field "${field.id}" is already registered.`,
      );
    }

    this.#fields.set(field.id, field);

    return this;
  }

  public get(id: string): Field {
    const field = this.#fields.get(id);

    if (!field) {
      throw new RegistryError(RegistryErrorCode.UnknownKey, id, `Unknown field "${id}".`);
    }

    return field;
  }

  public first(): Field | undefined {
    return this.#fields.values().next().value;
  }

  public has(id: string): boolean {
    return this.#fields.has(id);
  }

  public all(): readonly Field[] {
    return [...this.#fields.values()];
  }

  public [Symbol.iterator](): IterableIterator<Field> {
    return this.#fields.values();
  }
}
