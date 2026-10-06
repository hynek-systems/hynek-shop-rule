import type { Group } from "../nodes/group.ts";
import type { Rule } from "../nodes/rule.ts";
import type { RuleTree } from "../tree/rule-tree.ts";
import { Range } from "../values/range.ts";
import type {
  QueryBoolean,
  QueryCondition,
  QueryExpression,
  QueryGroup,
} from "./query-expression.ts";

export type QueryFieldMap = Readonly<Record<string, string>>;

export interface QueryAdapter<TQuery> {
  condition(query: TQuery, condition: QueryCondition): void;
  group(query: TQuery, group: QueryGroup, apply: (nested: TQuery) => void): void;
}

export class RuleQueryCompiler {
  public constructor(private readonly fields: QueryFieldMap = {}) {}

  public compile(tree: RuleTree): QueryGroup {
    return this.compileGroup(tree.root, "and");
  }

  public apply<TQuery>(tree: RuleTree, query: TQuery, adapter: QueryAdapter<TQuery>): TQuery {
    this.applyExpression(query, this.compile(tree), adapter);

    return query;
  }

  private compileGroup(group: Group, boolean: QueryBoolean): QueryGroup {
    const groupBoolean = this.boolean(group.operator.id);

    return {
      type: "group",
      boolean,
      children: group.children.map((child) => {
        if ("children" in child) {
          return this.compileGroup(child as Group, groupBoolean);
        }

        return this.compileRule(child as Rule, groupBoolean);
      }),
    };
  }

  private compileRule(rule: Rule, boolean: QueryBoolean): QueryCondition {
    const field = this.fields[rule.field];
    if (Object.keys(this.fields).length > 0 && !field) {
      throw new Error(`Rule field "${rule.field}" is not mapped to a database column.`);
    }
    const { operator, value } = this.operator(rule.operator.id, rule.value);

    return { type: "condition", boolean, field: field ?? rule.field, operator, value };
  }

  private operator(id: string, value: unknown): { operator: string; value: unknown } {
    switch (id) {
      case "=":
      case "!=":
        return { operator: id, value };
      case "contains":
        return { operator: "like", value: `%${String(value)}%` };
      case "starts_with":
        return { operator: "like", value: `${String(value)}%` };
      case "ends_with":
        return { operator: "like", value: `%${String(value)}` };
      case "greater_than":
      case "after":
        return { operator: ">", value };
      case "greater_than_or_equal":
        return { operator: ">=", value };
      case "less_than":
      case "before":
        return { operator: "<", value };
      case "less_than_or_equal":
        return { operator: "<=", value };
      case "between": {
        if (!(value instanceof Range)) {
          throw new Error('The "between" query operator requires a Range operand.');
        }

        return { operator: "between", value: [value.from, value.to] };
      }
      default:
        throw new Error(`Rule operator "${id}" cannot be translated to a database query.`);
    }
  }

  private boolean(id: string): QueryBoolean {
    if (id === "and" || id === "or") {
      return id;
    }

    throw new Error(`Group operator "${id}" cannot be translated to a database query.`);
  }

  private applyExpression<TQuery>(
    query: TQuery,
    expression: QueryExpression,
    adapter: QueryAdapter<TQuery>,
  ): void {
    if (expression.type === "condition") {
      adapter.condition(query, expression);
      return;
    }

    adapter.group(query, expression, (nested) => {
      for (const child of expression.children) {
        this.applyExpression(nested, child, adapter);
      }
    });
  }
}
