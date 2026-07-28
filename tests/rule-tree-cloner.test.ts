import { describe, expect, it } from "vite-plus/test";
import { RuleTree } from "../src/tree/rule-tree.ts";
import { Rule } from "../src/nodes/rule.ts";
import { RuleTreeCloner } from "../src/clone/rule-tree-cloner.ts";
import { RuleTreeSerializer } from "../src/serializer/rule-tree-serializer.ts";
import { Range } from "../src/values/range.ts";
import { EqualsOperator } from "../src/operators/rule/equals-operator.ts";

describe("RuleTreeCloner", () => {
  it("creates a deep clone", () => {
    const tree = new RuleTree();

    tree.root.append(Rule.field("country").equals("SE"));

    tree.root.append(Rule.field("active").equals(true));

    const cloner = new RuleTreeCloner();

    const clone = cloner.clone(tree);

    const serializer = new RuleTreeSerializer();

    expect(clone).not.toBe(tree);

    expect(clone.root).not.toBe(tree.root);

    expect(clone.root.children[0]).not.toBe(tree.root.children[0]);

    expect(serializer.serialize(clone)).toEqual(serializer.serialize(tree));
  });

  it("clones mutable operand values", () => {
    const tree = new RuleTree();
    const range = new Range(10, 20);
    tree.root.append(new Rule("price", new EqualsOperator(), range));

    const clone = new RuleTreeCloner().clone(tree);
    const clonedRule = clone.root.children[0] as Rule;

    expect(clonedRule.value).toEqual(range);
    expect(clonedRule.value).not.toBe(range);
  });
});
