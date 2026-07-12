export interface RuleDto {
  type: "rule";

  field: string;

  operator: string;

  value: unknown;
}

export interface GroupDto {
  type: "group";

  operator: string;

  children: NodeDto[];
}

export type NodeDto = RuleDto | GroupDto;

export interface RuleTreeDto {
  root: GroupDto;
}
