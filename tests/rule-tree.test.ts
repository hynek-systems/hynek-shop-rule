import { describe, expect, it } from "vite-plus/test";
import { RuleTree } from "../src/tree/rule-tree.ts";
import { EqualsOperator } from "../src/operators/rule/equals-operator.ts";
import { Rule } from "../src/nodes/rule.ts";
import { Group } from "../src/nodes/group.ts";
import { AndOperator } from "../src/operators/group/and-operator.ts";

describe("RuleTree", () => {
  it("builds a tree", () => {
    const tree = new RuleTree();

    const group = tree.root.append(new Group(new AndOperator()));

    const rule = group.append(new Rule("country", new EqualsOperator(), "SE"));

    expect(tree.root.children).toHaveLength(1);

    expect(group.parent).toBe(tree.root);

    expect(rule.parent).toBe(group);

    expect(rule.root).toBe(tree.root);
  });

  it("sets parent references", () => {
    const tree = new RuleTree();

    const group = tree.root.append(new Group(new AndOperator()));

    const rule = group.append(new Rule("country", new EqualsOperator(), "SE"));

    expect(rule.parent).toBe(group);
    expect(group.parent).toBe(tree.root);
    expect(rule.root).toBe(tree.root);
  });

  it("removes a node", () => {
    const tree = new RuleTree();

    const rule = tree.root.append(new Rule("country", new EqualsOperator(), "SE"));

    rule.remove();

    expect(tree.root.children).toHaveLength(0);

    expect(rule.parent).toBeNull();
  });

  it("replaces a node", () => {
    const tree = new RuleTree();

    const first = tree.root.append(new Rule("country", new EqualsOperator(), "SE"));

    const second = new Rule("country", new EqualsOperator(), "NO");

    first.replaceWith(second);

    expect(tree.root.children[0]).toBe(second);

    expect(first.parent).toBeNull();

    expect(second.parent).toBe(tree.root);
  });

  it("prepends a node", () => {
    const tree = new RuleTree();

    tree.root.append(new Rule("country", new EqualsOperator(), "SE"));

    tree.root.prepend(new Rule("country", new EqualsOperator(), "NO"));

    expect((tree.root.children[0] as Rule).value).toBe("NO");
  });

  it("inserts a node before another node", () => {
    const tree = new RuleTree();

    const second = tree.root.append(new Rule("country", new EqualsOperator(), "NO"));

    tree.root.insertBefore(second, new Rule("country", new EqualsOperator(), "SE"));

    expect((tree.root.children[0] as Rule).value).toBe("SE");
  });

  it("inserts a node after another node", () => {
    const tree = new RuleTree();

    const first = tree.root.append(new Rule("country", new EqualsOperator(), "SE"));

    tree.root.insertAfter(first, new Rule("country", new EqualsOperator(), "NO"));

    expect((tree.root.children[1] as Rule).value).toBe("NO");
  });

  it("clears a group", () => {
    const tree = new RuleTree();

    tree.root.append(new Rule("country", new EqualsOperator(), "SE"));

    tree.root.append(new Rule("country", new EqualsOperator(), "NO"));

    tree.root.clear();

    expect(tree.root.children).toHaveLength(0);
  });

  it("removes parent references when clearing", () => {
    const tree = new RuleTree();

    const rule = tree.root.append(new Rule("country", new EqualsOperator(), "SE"));

    tree.root.clear();

    expect(rule.parent).toBeNull();
  });
});
