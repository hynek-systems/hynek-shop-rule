import type { FieldResolver } from "./field-resolver.js";

export class ObjectFieldResolver implements FieldResolver<object> {
  public resolve(subject: object, field: string): unknown {
    return Reflect.get(subject, field);
  }
}
