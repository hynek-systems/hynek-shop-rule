import { RuleTree } from "../tree/rule-tree.ts";

import { GroupSerializer } from "./group-serializer.ts";

import type { RuleTreeDto } from "./types.ts";

export class RuleTreeSerializer {
  readonly #groupSerializer = new GroupSerializer();

  public serialize(tree: RuleTree): RuleTreeDto {
    return {
      root: this.#groupSerializer.serialize(tree.root),
    };
  }
}
