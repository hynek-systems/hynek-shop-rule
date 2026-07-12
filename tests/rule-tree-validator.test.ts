import { describe, it, expect } from "vite-plus/test";
import { RuleTree } from "../src/tree/rule-tree.ts";
import { RuleTreeValidator } from "../src/validation/rule-tree-validator.ts";
import { Rule } from "../src/nodes/rule.ts";

describe("RuleTreeValidator", () => {
  it("validates a rule tree", () => {
    const tree = new RuleTree();

    const errors = new RuleTreeValidator().validate(tree);

    expect(errors).toHaveLength(1);

    expect(errors[0].node).toBe(tree.root);
  });

  it("validates a valid tree", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field("country").equals("SE"));

    const errors = new RuleTreeValidator().validate(tree);

    expect(errors).toHaveLength(0);
  });

  it("validates an empty field", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field("").equals("SE"));

    const errors = new RuleTreeValidator().validate(tree);

    expect(errors).toHaveLength(1);

    expect(errors[0].node).toBe(tree.root.children[0]);
  });
});
