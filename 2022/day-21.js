import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-21.txt', 'utf-8');

const isNumber = (value) => /^\d+$/.test(value);

const solve = (monkeys, monkey, cache) => {
  const value = monkeys.get(monkey);

  if (isNumber(value)) {
    return +value;
  } else {
    const [monkeyA, op, monkeyB] = value.split(' ');

    const solveA = solve(monkeys, monkeyA, cache);
    cache.set(monkeyA, solveA);

    const solveB = solve(monkeys, monkeyB, cache);
    cache.set(monkeyB, solveB);

    let res;

    if (op === '+') {
      res = solveA + solveB;
    } else if (op === '-') {
      res = solveA - solveB;
    } else if (op === '*') {
      res = solveA * solveB;
    } else if (op === '/') {
      res = solveA / solveB;
    }

    cache.set(monkey, res);
    return res;
  }
};

function partOne(input) {
  const monkeys = input.split('\n').reduce((map, line) => {
    const [, monkey, job] = line.match(/(\w+): (.*)/);
    map.set(monkey, job);
    return map;
  }, new Map());

  return solve(monkeys, 'root', new Map());
}

function partTwo(input) {
  const monkeys = input.split('\n').reduce((map, line) => {
    const [, monkey, job] = line.match(/(\w+): (.*)/);
    map.set(monkey, job);
    return map;
  }, new Map());

  // Find a path from 'root' to 'humn'
  const path = ['humn'];
  let curr;

  while (curr !== 'root') {
    curr = path.at(-1);

    for (let [monkey, job] of monkeys.entries()) {
      if (job.includes(curr)) {
        path.push(monkey);
        break;
      }
    }
  }

  path.reverse();

  // Determine which branch 'humn' is in (root = left branch + right branch)
  const cache = new Map();
  const [monkeyA, , monkeyB] = monkeys.get('root').split(' ');

  const leftBranchResult = solve(monkeys, monkeyA, cache);
  const rightBranchResult = solve(monkeys, monkeyB, cache);
  const humnIsInLeftBranch = monkeyA === path.at(1);

  // Only one of the two branches can be altered to make 'root' match: the
  // branch that contains 'humn'.
  let target = humnIsInLeftBranch ? rightBranchResult : leftBranchResult;

  for (let ii = 1; ii < path.length - 1; ii += 1) {
    const monkey = path.at(ii);
    const [a, op, b] = monkeys.get(monkey).split(' ');

    if (a === path.at(ii + 1)) {
      if (op === '+') target -= cache.get(b);
      if (op === '-') target += cache.get(b);
      if (op === '*') target /= cache.get(b);
      if (op === '/') target *= cache.get(b);
    } else if (b === path.at(ii + 1)) {
      if (op === '+') target = target - cache.get(a);
      if (op === '-') target = cache.get(a) - target;
      if (op === '*') target = target / cache.get(a);
      if (op === '/') target = cache.get(a) / target;
    } else {
      throw new Error(`This condition should not be reached as there HAS to be a path to 'humn'.`);
    }

    if (a === 'humn' || b === 'humn') {
      return target;
    }
  }
}

console.log(partOne(input));
console.log(partTwo(input));
