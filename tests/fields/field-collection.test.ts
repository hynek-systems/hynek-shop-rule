import { describe, expect, it } from "vite-plus/test";

import { FieldCollection } from "../../src/fields/field-collection.ts";
import { Field } from "../../src/fields/field.ts";
import { NumberFieldType, StringFieldType } from "../../src/fields/field-types.ts";
import { RegistryError, RegistryErrorCode } from "../../src/support/registry-error.ts";

describe("FieldCollection", () => {
  it("registers fields", () => {
    const fields = new FieldCollection();

    const price = new Field("price", "Price", NumberFieldType);

    fields.register(price);

    expect(fields.get("price")).toBe(price);
  });

  it("throws when registering the same field twice", () => {
    const fields = new FieldCollection();

    fields.register(new Field("price", "Price", NumberFieldType));

    expect(() => fields.register(new Field("price", "Price", NumberFieldType))).toThrowError(
      expect.objectContaining<Partial<RegistryError>>({
        code: RegistryErrorCode.DuplicateKey,
        key: "price",
      }),
    );
  });

  it("is iterable", () => {
    const fields = new FieldCollection();

    fields
      .register(new Field("price", "Price", NumberFieldType))
      .register(new Field("country", "Country", StringFieldType));

    expect([...fields].map((field) => field.id)).toEqual(["price", "country"]);
  });
});
