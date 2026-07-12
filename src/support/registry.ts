export abstract class Registry<TKey extends PropertyKey, TValue> {
  readonly #items = new Map<TKey, TValue>();

  protected abstract keyOf(value: TValue): TKey;

  public register(value: TValue): this {
    const key = this.keyOf(value);

    if (this.#items.has(key)) {
      throw new Error(`An item with key "${String(key)}" is already registered.`);
    }

    this.#items.set(key, value);

    return this;
  }

  public has(key: TKey): boolean {
    return this.#items.has(key);
  }

  public get(key: TKey): TValue {
    const value = this.#items.get(key);

    if (!value) {
      throw new Error(`No item registered with key "${String(key)}".`);
    }

    return value;
  }

  public values(): readonly TValue[] {
    return [...this.#items.values()];
  }

  public clear(): void {
    this.#items.clear();
  }
}
