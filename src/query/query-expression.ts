export type QueryBoolean = "and" | "or";

export interface QueryCondition {
  type: "condition";
  boolean: QueryBoolean;
  field: string;
  operator: string;
  value: unknown;
}

export interface QueryGroup {
  type: "group";
  boolean: QueryBoolean;
  children: QueryExpression[];
}

export type QueryExpression = QueryCondition | QueryGroup;
