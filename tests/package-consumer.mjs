import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const temporaryDirectory = mkdtempSync(join(tmpdir(), "hynek-shop-rule-"));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const npmEnvironment = { ...process.env, npm_config_dry_run: "false" };
let tarballPath;

const runtimeConsumer = `
import assert from "node:assert/strict";
import {
  AndOperator,
  EqualsOperator,
  OperandKind,
  ObjectFieldResolver,
  Rule,
  RuleContext,
  RuleEvaluator,
  RuleOperator,
  RuleTree,
  assertRuleOperatorContract,
} from "@hynek-shop/rule";

class IsEvenOperator extends RuleOperator {
  id = "is_even";
  label = "Is even";
  operandKind = OperandKind.None;

  isValidOperand(value) {
    return value === null;
  }

  evaluate(left) {
    return typeof left === "number" && left % 2 === 0;
  }
}

const customOperator = new IsEvenOperator();
assertRuleOperatorContract(customOperator, {
  validOperands: [null],
  invalidOperands: [1],
});

const context = new RuleContext();
context.groupOperators.register(new AndOperator());
context.ruleOperators.register(new EqualsOperator());

const tree = new RuleTree();
tree.root.append(Rule.field("country").equals("SE"));

const restored = context.fromJSON(tree.toJSON());
const evaluator = new RuleEvaluator(new ObjectFieldResolver());

assert.equal(evaluator.evaluate(restored, { country: "SE" }), true);

const customTree = new RuleTree();
customTree.root.append(new Rule("quantity", customOperator, null));
assert.equal(evaluator.evaluate(customTree, { quantity: 4 }), true);
`;

const typeConsumer = `
import {
  type FieldResolver,
  type RuleTreeDto,
  ObjectFieldResolver,
  RuleEvaluator,
  RuleTree,
  ValidationError,
} from "@hynek-shop/rule";

declare const dto: RuleTreeDto;
declare const error: ValidationError;
declare const resolver: FieldResolver<object>;

new RuleEvaluator(resolver).evaluate(new RuleTree(), {});
new ObjectFieldResolver().resolve({}, "field");
error.message;
dto.root.children;
`;

try {
  const packResult = execFileSync(npm, ["pack", "--json", "--ignore-scripts"], {
    cwd: root,
    encoding: "utf8",
    env: npmEnvironment,
  });
  const packMetadata = JSON.parse(packResult);
  const packageMetadata = Array.isArray(packMetadata)
    ? packMetadata[0]
    : Object.values(packMetadata)[0];
  const { filename } = packageMetadata;

  tarballPath = join(root, filename);

  writeFileSync(
    join(temporaryDirectory, "package.json"),
    JSON.stringify({ private: true, type: "module" }),
  );
  writeFileSync(join(temporaryDirectory, "consumer.mjs"), runtimeConsumer);
  writeFileSync(join(temporaryDirectory, "consumer.ts"), typeConsumer);

  execFileSync(npm, ["install", "--ignore-scripts", "--no-audit", "--no-fund", tarballPath], {
    cwd: temporaryDirectory,
    env: npmEnvironment,
    stdio: "inherit",
  });
  execFileSync(process.execPath, [join(temporaryDirectory, "consumer.mjs")], {
    stdio: "inherit",
  });
  execFileSync(
    join(root, "node_modules", ".bin", "tsc"),
    [
      "--noEmit",
      "--strict",
      "--target",
      "ES2023",
      "--module",
      "NodeNext",
      "--moduleResolution",
      "NodeNext",
      join(temporaryDirectory, "consumer.ts"),
    ],
    { cwd: temporaryDirectory, stdio: "inherit" },
  );

  assert.ok(filename.endsWith(".tgz"));
} finally {
  rmSync(temporaryDirectory, { force: true, recursive: true });

  if (tarballPath) {
    rmSync(tarballPath, { force: true });
  }
}
