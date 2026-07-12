import { describe, expect, it } from "vite-plus/test";
import { RuleTree } from "../src/tree/rule-tree.ts";
import { Rule } from "../src/nodes/rule.ts";

describe("RuleTree serialization", () => {
  it("serializes a tree", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field("country").equals("SE"));

    tree.root.append(Rule.field("active").equals(true));

    expect(tree.toJSON()).toEqual({
      root: {
        type: "group",
        operator: "and",
        children: [
          {
            type: "rule",
            field: "country",
            operator: "=",
            value: "SE",
          },
          {
            type: "rule",
            field: "active",
            operator: "=",
            value: true,
          },
        ],
      },
    });
  });
});
