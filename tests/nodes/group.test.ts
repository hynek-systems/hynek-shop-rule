import { describe, expect, it } from "vite-plus/test";
import { Group } from "../../src/nodes/group.ts";
import { AndOperator, OrOperator } from "../../src/index.ts";

describe("Group", () => {
  it("should create a group with the specified operator", () => {
    const group = new Group(new AndOperator());
    expect(group.operator).toBeInstanceOf(AndOperator);
  });

  it("should append a child node", () => {
    const group = new Group(new OrOperator());
    const child = new Group(new AndOperator());
    group.append(child);
    expect(group.children).toContain(child);
    expect(child.parent).toBe(group);
  });

  it("should prepend a child node", () => {
    const group = new Group(new OrOperator());
    const child1 = new Group(new AndOperator());
    const child2 = new Group(new OrOperator());
    group.append(child1);
    group.prepend(child2);
    expect(group.children[0]).toBe(child2);
    expect(group.children[1]).toBe(child1);
  });

  it("should insert a child node before a reference node", () => {
    const group = new Group(new OrOperator());
    const child1 = new Group(new AndOperator());
    const child2 = new Group(new OrOperator());
    group.append(child1);
    group.insertBefore(child1, child2);
    expect(group.children[0]).toBe(child2);
    expect(group.children[1]).toBe(child1);
  });

  it("should insert a child node after a reference node", () => {
    const group = new Group(new OrOperator());
    const child1 = new Group(new AndOperator());
    const child2 = new Group(new OrOperator());
    group.append(child1);
    group.insertAfter(child1, child2);
    expect(group.children[0]).toBe(child1);
    expect(group.children[1]).toBe(child2);
  });

  it("should insert a child node at a specific index", () => {
    const group = new Group(new OrOperator());
    const child1 = new Group(new AndOperator());
    const child2 = new Group(new OrOperator());
    group.append(child1);
    group.insertAt(0, child2);
    expect(group.children[0]).toBe(child2);
    expect(group.children[1]).toBe(child1);
  });

  it("should clear all child nodes", () => {
    const group = new Group(new OrOperator());
    const child1 = new Group(new AndOperator());
    const child2 = new Group(new OrOperator());
    group.append(child1);
    group.append(child2);
    group.clear();
    expect(group.children.length).toBe(0);
  });

  it("should detach a child node", () => {
    const group = new Group(new OrOperator());
    const child = new Group(new AndOperator());
    group.append(child);
    const index = group.detach(child);
    expect(index).toBe(0);
    expect(group.children.length).toBe(0);
    expect(child.parent).toBeNull();
  });

  it("should return -1 when detaching a non-existent child node", () => {
    const group = new Group(new OrOperator());
    const child = new Group(new AndOperator());
    expect(() => group.detach(child)).toThrow("Node does not belong to this group.");
  });

  it("should replace a child node with a new node", () => {
    const group = new Group(new OrOperator());
    const oldChild = new Group(new AndOperator());
    const newChild = new Group(new OrOperator());
    group.append(oldChild);
    group.replace(oldChild, newChild);
    expect(group.children[0]).toBe(newChild);
    expect(newChild.parent).toBe(group);
    expect(oldChild.parent).toBeNull();
  });

  it("should throw an error when replacing a non-existent child node", () => {
    const group = new Group(new OrOperator());
    const oldChild = new Group(new AndOperator());
    const newChild = new Group(new OrOperator());
    expect(() => group.replace(oldChild, newChild)).toThrowError(
      "Node does not belong to this group.",
    );
  });

  it("should throw an error when inserting before a non-existent reference node", () => {
    const group = new Group(new OrOperator());
    const reference = new Group(new AndOperator());
    const newChild = new Group(new OrOperator());
    expect(() => group.insertBefore(reference, newChild)).toThrowError(
      "Reference node does not belong to this group.",
    );
  });

  it("should throw an error when inserting after a non-existent reference node", () => {
    const group = new Group(new OrOperator());
    const reference = new Group(new AndOperator());
    const newChild = new Group(new OrOperator());
    expect(() => group.insertAfter(reference, newChild)).toThrowError(
      "Reference node does not belong to this group.",
    );
  });

  it("should throw a RangeError when inserting at an out-of-bounds index", () => {
    const group = new Group(new OrOperator());
    const child = new Group(new AndOperator());
    expect(() => group.insertAt(-1, child)).toThrowError(RangeError);
    expect(() => group.insertAt(1, child)).toThrowError(RangeError);
  });
});
