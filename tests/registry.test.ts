import { describe, expect, it } from "vite-plus/test";
import { Registry } from "../src/support/registry.ts";
import { RegistryError, RegistryErrorCode } from "../src/support/registry-error.ts";

class TestRegistry extends Registry<string, string> {
  protected keyOf(value: string): string {
    return value;
  }
}

describe("Registry", () => {
  it("should be able to register items", () => {
    const registry = new TestRegistry();

    registry.register("item1");
    registry.register("item2");

    expect(registry.has("item1")).toBe(true);
    expect(registry.has("item2")).toBe(true);
  });

  it("should throw an error when registering an item with a duplicate key", () => {
    const registry = new TestRegistry();

    registry.register("item1");

    expect(() => registry.register("item1")).toThrowError(
      expect.objectContaining<Partial<RegistryError>>({
        code: RegistryErrorCode.DuplicateKey,
        key: "item1",
      }),
    );
  });

  it("should be able to retrieve items by key", () => {
    const registry = new TestRegistry();

    registry.register("item1");
    registry.register("item2");

    expect(registry.get("item1")).toBe("item1");
    expect(registry.get("item2")).toBe("item2");
  });

  it("should throw an error when retrieving an item with a non-existent key", () => {
    const registry = new TestRegistry();

    expect(() => registry.get("nonExistentItem")).toThrowError(
      expect.objectContaining<Partial<RegistryError>>({
        code: RegistryErrorCode.UnknownKey,
        key: "nonExistentItem",
      }),
    );
  });

  it("should return all registered items", () => {
    const registry = new TestRegistry();

    registry.register("item1");
    registry.register("item2");

    expect(registry.values()).toEqual(["item1", "item2"]);
  });

  it("should be able to clear all registered items", () => {
    const registry = new TestRegistry();

    registry.register("item1");
    registry.register("item2");

    registry.clear();

    expect(registry.values()).toEqual([]);
  });
});
