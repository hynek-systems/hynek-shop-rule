import { FieldType } from "./field-type.ts";

export const StringFieldType = new FieldType<string>("string", "String");

export const NumberFieldType = new FieldType<number>("number", "Number");

export const BooleanFieldType = new FieldType<boolean>("boolean", "Boolean");

export const DateFieldType = new FieldType<Date>("date", "Date");
