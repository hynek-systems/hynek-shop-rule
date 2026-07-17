import { Node } from "./node.ts";

import type { GroupOperator } from "../operators/group/group-operator.ts";
import type { NodeVisitor } from "../visitors/node-visitor.ts";

export class Group extends Node {
  private readonly _children: Node[] = [];

  public constructor(public operator: GroupOperator) {
    super();
  }

  public get children(): readonly Node[] {
    return this._children;
  }

  public append<T extends Node>(node: T): T {
    this._children.push(this.attach(node));

    return node;
  }

  public prepend<T extends Node>(node: T): T {
    this._children.unshift(this.attach(node));

    return node;
  }

  public insertBefore<T extends Node>(reference: Node, node: T): T {
    const index = this._children.indexOf(reference);

    if (index === -1) {
      throw new Error("Reference node does not belong to this group.");
    }

    this.insertAt(index, node);

    return node;
  }

  public insertAfter<T extends Node>(reference: Node, node: T): T {
    const index = this._children.indexOf(reference);

    if (index === -1) {
      throw new Error("Reference node does not belong to this group.");
    }

    this.insertAt(index + 1, node);

    return node;
  }

  public insertAt<T extends Node>(index: number, node: T): T {
    if (index < 0 || index > this._children.length) {
      throw new RangeError("Index is out of bounds.");
    }

    this._children.splice(index, 0, this.attach(node));

    return node;
  }

  public detachChildren(): Node[] {
    const children = [...this._children];

    this._children.length = 0;

    for (const child of children) {
      child.setParent(null);
    }

    return children;
  }

  public clear(): void {
    for (const child of this._children) {
      child.setParent(null);
    }

    this._children.length = 0;
  }

  public detach(node: Node): number {
    const index = this._children.indexOf(node);

    if (index === -1) {
      throw new Error("Node does not belong to this group.");
    }

    node.setParent(null);

    this._children.splice(index, 1);

    return index;
  }

  public replace(oldNode: Node, newNode: Node): void {
    const index = this._children.indexOf(oldNode);

    if (index === -1) {
      throw new Error("Node does not belong to this group.");
    }

    if (newNode.parent) {
      throw new Error("Node already belongs to a group.");
    }

    oldNode.setParent(null);

    newNode.setParent(this);

    this._children[index] = newNode;
  }

  public accept<TResult>(visitor: NodeVisitor<TResult>): TResult {
    return visitor.visitGroup(this);
  }

  private attach<T extends Node>(node: T): T {
    if (node.parent) {
      throw new Error("Node already belongs to a group.");
    }

    node.setParent(this);

    return node;
  }
}
