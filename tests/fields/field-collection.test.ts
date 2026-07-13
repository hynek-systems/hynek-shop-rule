import { describe, expect, it } from "vite-plus/test";

import { FieldCollection } from "../../src/fields/field-collection.ts";
import { Field } from "../../src/fields/field.ts";

describe("FieldCollection", () => {
  it("registers fields", () => {
    const fields = new FieldCollection();

    const price = new Field<number>("price", "Price");

    fields.register(price);

    expect(fields.get("price")).toBe(price);
  });

  it("throws when registering the same field twice", () => {
    const fields = new FieldCollection();

    fields.register(new Field("price", "Price"));

    expect(() => fields.register(new Field("price", "Price"))).toThrow();
  });

  it("is iterable", () => {
    const fields = new FieldCollection();

    fields.register(new Field("price", "Price")).register(new Field("country", "Country"));

    expect([...fields].map((field) => field.id)).toEqual(["price", "country"]);
  });
});
