import { Node } from "./node.ts";

import type { GroupOperator } from "../operators/group/group-operator.ts";
import type { NodeVisitor } from "../visitors/node-visitor.ts";
import { MAX_RULE_TREE_DEPTH, RuleTreeDepthError } from "../tree/rule-tree-limits.ts";

export class Group extends Node {
  private readonly _children: Node[] = [];

  public constructor(public operator: GroupOperator) {
    super();
  }

  public get children(): readonly Node[] {
    return this._children;
  }

  public override get root(): Group {
    return this.parent?.root ?? this;
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

    this.assertAttachable(newNode);

    oldNode.setParent(null);

    newNode.setParent(this);

    this._children[index] = newNode;
  }

  public accept<TResult>(visitor: NodeVisitor<TResult>): TResult {
    return visitor.visitGroup(this);
  }

  private attach<T extends Node>(node: T): T {
    this.assertAttachable(node);

    node.setParent(this);

    return node;
  }

  private assertAttachable(node: Node): void {
    if (node.parent) {
      throw new Error("Node already belongs to a group.");
    }

    if (this.depth() + 1 + this.subtreeDepth(node) > MAX_RULE_TREE_DEPTH) {
      throw new RuleTreeDepthError();
    }
  }

  private depth(): number {
    let depth = 0;
    let group = this.parent;

    while (group) {
      depth += 1;
      group = group.parent;
    }

    return depth;
  }

  private subtreeDepth(node: Node): number {
    let maximumDepth = 0;
    const pending: { node: Node; depth: number }[] = [{ node, depth: 0 }];

    while (pending.length > 0) {
      const current = pending.pop();

      if (!current) {
        break;
      }

      maximumDepth = Math.max(maximumDepth, current.depth);

      if (current.node instanceof Group) {
        for (const child of current.node.children) {
          pending.push({ node: child, depth: current.depth + 1 });
        }
      }
    }

    return maximumDepth;
  }
}
