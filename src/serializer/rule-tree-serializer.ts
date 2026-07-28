import { RuleTree } from "../tree/rule-tree.ts";

import { GroupSerializer } from "./group-serializer.ts";

import { RULE_TREE_FORMAT_VERSION, type RuleTreeDto } from "./types.ts";

export class RuleTreeSerializer {
  readonly #groupSerializer = new GroupSerializer();

  public serialize(tree: RuleTree): RuleTreeDto {
    return {
      version: RULE_TREE_FORMAT_VERSION,
      root: this.#groupSerializer.serialize(tree.root),
    };
  }
}
