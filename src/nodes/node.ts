import type { NodeVisitor } from "../visitors/node-visitor.ts";
import type { Group } from "./group.ts";

export abstract class Node {
  public readonly id: string;

  public parent: Group | null = null;

  protected constructor(id?: string) {
    this.id = id ?? crypto.randomUUID();
  }

  public get root(): Group {
    let node: Node = this;

    while (node.parent) {
      node = node.parent;
    }

    return node as Group;
  }

  public setParent(parent: Group | null): void {
    this.parent = parent;
  }

  public remove(): void {
    this.parent?.detach(this);
  }

  public replaceWith(node: Node): void {
    this.parent?.replace(this, node);
  }

  public abstract accept<TResult>(visitor: NodeVisitor<TResult>): TResult;
}
