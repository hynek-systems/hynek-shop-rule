import { Group } from "../nodes/group.js";
import { Rule } from "../nodes/rule.js";
import { RuleTree } from "../tree/rule-tree.js";

import type { GroupDto, RuleDto, RuleTreeDto } from "./types.js";
import type { RuleContext } from "../rule-context.ts";

export class RuleTreeDeserializer {
  public constructor(private readonly context: RuleContext) {}

  public deserialize(dto: RuleTreeDto): RuleTree {
    return new RuleTree(this.deserializeGroup(dto.root));
  }

  private deserializeGroup(dto: GroupDto): Group {
    const group = new Group(this.context.groupOperators.get(dto.operator));

    for (const child of dto.children) {
      if (child.type === "group") {
        group.append(this.deserializeGroup(child));

        continue;
      }

      group.append(this.deserializeRule(child));
    }

    return group;
  }

  private deserializeRule(dto: RuleDto): Rule {
    return new Rule(dto.field, this.context.ruleOperators.get(dto.operator), dto.value);
  }
}
