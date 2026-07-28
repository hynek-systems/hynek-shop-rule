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

export const RULE_TREE_FORMAT_VERSION = 1 as const;

export interface RuleTreeDto {
  version: typeof RULE_TREE_FORMAT_VERSION;

  root: GroupDto;
}

export interface LegacyRuleTreeDto {
  root: GroupDto;
}

export type RuleTreeInputDto = RuleTreeDto | LegacyRuleTreeDto;
