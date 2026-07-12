import type { FieldResolver } from "./field-resolver.ts";

export class ObjectFieldResolver implements FieldResolver<object> {
  public resolve(subject: object, field: string): unknown {
    return Reflect.get(subject, field);
  }
}
