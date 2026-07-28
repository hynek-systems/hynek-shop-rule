import { performance } from "node:perf_hooks";
import {
  ObjectFieldResolver,
  Rule,
  RuleEvaluator,
  RuleTree,
  RuleTreeCloner,
} from "../dist/index.mjs";

const sizes = [100, 1_000, 10_000];
const samples = 7;
const budgets = {
  10_000: {
    evaluate: 250,
    serialize: 250,
    clone: 1_000,
  },
};

function createTree(size) {
  const tree = new RuleTree();

  for (let index = 0; index < size; index += 1) {
    tree.root.append(Rule.field(`field${index}`).equals(index));
  }

  return tree;
}

function medianDuration(operation) {
  const durations = [];

  for (let sample = 0; sample < samples; sample += 1) {
    const start = performance.now();
    operation();
    durations.push(performance.now() - start);
  }

  durations.sort((left, right) => left - right);

  return durations[Math.floor(durations.length / 2)];
}

console.log("rules\tevaluate_ms\tserialize_ms\tclone_ms");

for (const size of sizes) {
  const tree = createTree(size);
  const subject = Object.fromEntries(
    Array.from({ length: size }, (_, index) => [`field${index}`, index]),
  );
  const evaluator = new RuleEvaluator(new ObjectFieldResolver());
  const cloner = new RuleTreeCloner();

  evaluator.evaluate(tree, subject);
  tree.toJSON();
  cloner.clone(tree);

  const evaluateMs = medianDuration(() => evaluator.evaluate(tree, subject));
  const serializeMs = medianDuration(() => tree.toJSON());
  const cloneMs = medianDuration(() => cloner.clone(tree));

  console.log([size, evaluateMs.toFixed(2), serializeMs.toFixed(2), cloneMs.toFixed(2)].join("\t"));

  const budget = budgets[size];

  if (
    budget &&
    (evaluateMs > budget.evaluate || serializeMs > budget.serialize || cloneMs > budget.clone)
  ) {
    process.exitCode = 1;
  }
}
