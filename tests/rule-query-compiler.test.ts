import { describe, expect, it } from "vite-plus/test";
import {
  AndOperator,
  ContainsOperator,
  EqualsOperator,
  OrOperator,
  Range,
  Rule,
  RuleQueryCompiler,
  RuleTree,
  BetweenOperator,
  Group,
} from "../src/index.ts";

describe("RuleQueryCompiler", () => {
  it("compiles nested rule groups and mapped fields", () => {
    const tree = new RuleTree();
    tree.root.append(new Rule("subject", new ContainsOperator(), "refund"));
    const alternatives = tree.root.append(new Group(new OrOperator()));
    alternatives.append(new Rule("status", new EqualsOperator(), "open"));
    alternatives.append(new Rule("priority", new EqualsOperator(), "urgent"));

    const query = new RuleQueryCompiler({
      subject: "support_tickets.subject",
      status: "support_tickets.status",
      priority: "support_tickets.priority",
    }).compile(tree);

    expect(query).toEqual({
      type: "group",
      boolean: "and",
      children: [
        {
          type: "condition",
          boolean: "and",
          field: "support_tickets.subject",
          operator: "like",
          value: "%refund%",
        },
        {
          type: "group",
          boolean: "and",
          children: [
            {
              type: "condition",
              boolean: "or",
              field: "support_tickets.status",
              operator: "=",
              value: "open",
            },
            {
              type: "condition",
              boolean: "or",
              field: "support_tickets.priority",
              operator: "=",
              value: "urgent",
            },
          ],
        },
      ],
    });
  });

  it("translates ranges", () => {
    const tree = new RuleTree(new Group(new AndOperator()));
    tree.root.append(new Rule("created_at", new BetweenOperator(), new Range(1, 10)));

    expect(new RuleQueryCompiler().compile(tree).children[0]).toMatchObject({
      operator: "between",
      value: [1, 10],
    });
  });

  it("rejects fields outside a configured database allow-list", () => {
    const tree = new RuleTree();
    tree.root.append(new Rule("unknown", new EqualsOperator(), "value"));

    expect(() => new RuleQueryCompiler({ status: "tickets.status" }).compile(tree)).toThrow(
      'Rule field "unknown" is not mapped',
    );
  });

  it("applies the compiled query through an adapter", () => {
    const tree = new RuleTree();
    tree.root.append(new Rule("status", new EqualsOperator(), "open"));
    const calls: unknown[] = [];

    new RuleQueryCompiler().apply(tree, calls, {
      condition(query, condition) {
        query.push(condition);
      },
      group(query, group, apply) {
        const nested: unknown[] = [];
        apply(nested);
        query.push({ boolean: group.boolean, nested });
      },
    });

    expect(calls).toEqual([
      {
        boolean: "and",
        nested: [
          {
            type: "condition",
            boolean: "and",
            field: "status",
            operator: "=",
            value: "open",
          },
        ],
      },
    ]);
  });
});
