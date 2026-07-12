import { describe, expect, it } from "vite-plus/test";

import { Range } from "../src/values/range.ts";

describe("Range", () => {
  it("stores from and to", () => {
    const range = new Range(10, 20);

    expect(range.from).toBe(10);

    expect(range.to).toBe(20);
  });
});
