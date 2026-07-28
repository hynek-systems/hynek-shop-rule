import { describe, expect, it } from "vite-plus/test";
import { RuleTree } from "../src/tree/rule-tree.ts";
import { EqualsOperator } from "../src/operators/rule/equals-operator.ts";
import { Rule } from "../src/nodes/rule.ts";
import { Group } from "../src/nodes/group.ts";
import { AndOperator } from "../src/operators/group/and-operator.ts";
import { NotEqualsOperator } from "../src/operators/rule/not-equals-operator.ts";
import { Field } from "../src/fields/field.ts";
import { StringFieldType } from "../src/fields/field-types.ts";
import { MAX_RULE_TREE_DEPTH, RuleTreeDepthError } from "../src/tree/rule-tree-limits.ts";

class TestField extends Field<string> {
  public constructor() {
    super("country", "Land", StringFieldType);
  }

  public operators() {
    return [new EqualsOperator(), new NotEqualsOperator()];
  }
}

describe("RuleTree", () => {
  it("limits tree depth", () => {
    const tree = new RuleTree();
    let group = tree.root;

    for (let depth = 0; depth < MAX_RULE_TREE_DEPTH; depth += 1) {
      group = group.append(new Group(new AndOperator()));
    }

    expect(() => group.append(new Group(new AndOperator()))).toThrowError(RuleTreeDepthError);
  });

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

  it("has no root for a detached rule", () => {
    const rule = new Rule("country", new EqualsOperator(), "SE");

    expect(rule.root).toBeNull();
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

  it("creates a rule using the fluent api", () => {
    const rule = Rule.field("country").equals("SE");

    expect(rule.field).toBe("country");

    expect(rule.value).toBe("SE");

    expect(rule.operator).toBeInstanceOf(EqualsOperator);
  });

  it("creates a not equals rule", () => {
    const rule = Rule.field("country").notEquals("NO");

    expect(rule.operator).toBeInstanceOf(NotEqualsOperator);
    expect(rule.value).toBe("NO");
  });

  it("creates a rule from a field", () => {
    const rule = Rule.field(new TestField()).equals("SE");

    expect(rule.field).toBe("country");

    expect(rule.value).toBe("SE");
  });

  it("describes its supported operators", () => {
    const field = new TestField();

    expect(field.operators()).toHaveLength(2);

    expect(field.operators()[0]).toBeInstanceOf(EqualsOperator);
  });
});
