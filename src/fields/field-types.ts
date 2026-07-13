import { FieldType } from "./field-type.ts";
import { ValueControl } from "./value-control.ts";

export const StringFieldType = new FieldType<string>("string", "String", ValueControl.Text, [
  "=",
  "!=",
  "contains",
  "starts_with",
  "ends_with",
]);

export const NumberFieldType = new FieldType<number>("number", "Number", ValueControl.Number, [
  "=",
  "!=",
  "greater_than",
  "greater_than_or_equal",
  "less_than",
  "less_than_or_equal",
  "between",
]);

export const BooleanFieldType = new FieldType<boolean>("boolean", "Boolean", ValueControl.Boolean);

export const DateFieldType = new FieldType<Date>("date", "Date", ValueControl.Date, [
  "=",
  "!=",
  "before",
  "after",
  "between",
]);
