import { FieldType } from "./field-type.ts";

export const StringFieldType = new FieldType<string>("string", "String", [
  "=",
  "!=",
  "contains",
  "starts_with",
  "ends_with",
]);

export const NumberFieldType = new FieldType<number>("number", "Number", [
  "=",
  "!=",
  "greater_than",
  "greater_than_or_equal",
  "less_than",
  "less_than_or_equal",
  "between",
]);

export const BooleanFieldType = new FieldType<boolean>("boolean", "Boolean");

export const DateFieldType = new FieldType<Date>("date", "Date", [
  "=",
  "!=",
  "before",
  "after",
  "between",
]);
