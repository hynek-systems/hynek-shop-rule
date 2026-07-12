import { RuleTree } from "../tree/rule-tree.js";

import { GroupSerializer } from "./group-serializer.js";

import type { RuleTreeDto } from "./types.js";

export class RuleTreeSerializer {
  readonly #groupSerializer = new GroupSerializer();

  public serialize(tree: RuleTree): RuleTreeDto {
    return {
      root: this.#groupSerializer.serialize(tree.root),
    };
  }
}
