export const MAX_RULE_TREE_DEPTH = 100;

export class RuleTreeDepthError extends RangeError {
  public override readonly name = "RuleTreeDepthError";

  public constructor(public readonly maxDepth = MAX_RULE_TREE_DEPTH) {
    super(`Rule tree depth must not exceed ${maxDepth}.`);
  }
}
