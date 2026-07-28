import { Group } from "../nodes/group.ts";
import { Rule } from "../nodes/rule.ts";
import { RuleTree } from "../tree/rule-tree.ts";

import type { RuleContext } from "../rule-context.ts";
import {
  RuleTreeDeserializationError,
  RuleTreeDeserializationErrorCode,
} from "./rule-tree-deserialization-error.ts";
import { RULE_TREE_FORMAT_VERSION } from "./types.ts";

export class RuleTreeDeserializer {
  public constructor(private readonly context: RuleContext) {}

  public deserialize(dto: unknown): RuleTree {
    if (!this.isRecord(dto)) {
      this.fail(RuleTreeDeserializationErrorCode.InvalidDto, "$", "Expected an object.");
    }

    if ("version" in dto && dto.version !== RULE_TREE_FORMAT_VERSION) {
      this.fail(
        RuleTreeDeserializationErrorCode.UnsupportedVersion,
        "$.version",
        `Unsupported rule tree version "${String(dto.version)}".`,
      );
    }

    return new RuleTree(this.deserializeGroup(dto.root, "$.root"));
  }

  private deserializeGroup(value: unknown, path: string): Group {
    if (!this.isRecord(value) || value.type !== "group") {
      this.fail(RuleTreeDeserializationErrorCode.InvalidDto, path, "Expected a group node.");
    }

    if (typeof value.operator !== "string") {
      this.fail(
        RuleTreeDeserializationErrorCode.InvalidDto,
        `${path}.operator`,
        "Expected a group operator ID.",
      );
    }

    if (!this.context.groupOperators.has(value.operator)) {
      this.fail(
        RuleTreeDeserializationErrorCode.UnknownGroupOperator,
        `${path}.operator`,
        `Unknown group operator "${value.operator}".`,
      );
    }

    if (!Array.isArray(value.children)) {
      this.fail(
        RuleTreeDeserializationErrorCode.InvalidDto,
        `${path}.children`,
        "Expected an array of child nodes.",
      );
    }

    const group = new Group(this.context.groupOperators.get(value.operator));

    for (const [index, child] of value.children.entries()) {
      const childPath = `${path}.children[${index}]`;

      if (this.isRecord(child) && child.type === "group") {
        group.append(this.deserializeGroup(child, childPath));

        continue;
      }

      group.append(this.deserializeRule(child, childPath));
    }

    return group;
  }

  private deserializeRule(value: unknown, path: string): Rule {
    if (!this.isRecord(value) || value.type !== "rule") {
      this.fail(RuleTreeDeserializationErrorCode.InvalidDto, path, "Expected a rule node.");
    }

    if (typeof value.field !== "string" || value.field.trim().length === 0) {
      this.fail(
        RuleTreeDeserializationErrorCode.InvalidDto,
        `${path}.field`,
        "Expected a non-empty field ID.",
      );
    }

    if (this.context.fields.all().length > 0 && !this.context.fields.has(value.field)) {
      this.fail(
        RuleTreeDeserializationErrorCode.UnknownField,
        `${path}.field`,
        `Unknown field "${value.field}".`,
      );
    }

    if (typeof value.operator !== "string") {
      this.fail(
        RuleTreeDeserializationErrorCode.InvalidDto,
        `${path}.operator`,
        "Expected a rule operator ID.",
      );
    }

    if (!this.context.ruleOperators.has(value.operator)) {
      this.fail(
        RuleTreeDeserializationErrorCode.UnknownRuleOperator,
        `${path}.operator`,
        `Unknown rule operator "${value.operator}".`,
      );
    }

    const operator = this.context.ruleOperators.get(value.operator);
    let operand: unknown;

    try {
      operand = operator.deserializeOperand(value.value);
    } catch (error) {
      throw new RuleTreeDeserializationError(
        RuleTreeDeserializationErrorCode.InvalidOperand,
        `${path}.value`,
        `Invalid operand for operator "${value.operator}".`,
        { cause: error },
      );
    }

    if (!operator.isValidOperand(operand)) {
      this.fail(
        RuleTreeDeserializationErrorCode.InvalidOperand,
        `${path}.value`,
        `Invalid operand for operator "${value.operator}".`,
      );
    }

    return new Rule(value.field, operator, operand);
  }

  private isRecord(value: unknown): value is Record<PropertyKey, unknown> {
    return typeof value === "object" && value !== null;
  }

  private fail(code: RuleTreeDeserializationErrorCode, path: string, message: string): never {
    throw new RuleTreeDeserializationError(code, path, message);
  }
}
