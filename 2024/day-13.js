import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-13.txt', 'utf-8');

const solve = (eqA, eqB) => {
  /*
    Derived this by solving an example equation manually and using the
    substitution method.
  */
  const y = (eqA[0] * eqB[2] - eqB[0] * eqA[2]) / (-eqB[0] * eqA[1] + eqB[1] * eqA[0]);
  const x = (eqA[2] - eqA[1] * y) / eqA[0];

  return [x, y];
};

function partOne(equations) {
  return equations.reduce((sum, eq) => {
    const [x, y] = solve(eq[0], eq[1]);
    if (x > 100 || y > 100 || !Number.isInteger(x) || !Number.isInteger(y)) return sum;
    return sum + x * 3 + y;
  }, 0);
}

function partTwo(equations) {
  return equations.reduce((sum, eq) => {
    const incrementedEq0 = [eq[0][0], eq[0][1], eq[0][2] + 10_000_000_000_000];
    const incrementedEq1 = [eq[1][0], eq[1][1], eq[1][2] + 10_000_000_000_000];
    const [x, y] = solve(incrementedEq0, incrementedEq1);
    if (!Number.isInteger(x) || !Number.isInteger(y)) return sum;
    return sum + x * 3 + y;
  }, 0);
}

function parseInput(input) {
  const lines = input.split('\n');
  const equations = [];

  for (let idx = 0; idx < lines.length; idx += 4) {
    const [a, b] = lines[idx].match(/\d+/g).map(Number);
    const [c, d] = lines[idx + 1].match(/\d+/g).map(Number);
    const [e, f] = lines[idx + 2].match(/\d+/g).map(Number);

    equations.push([
      [a, c, e],
      [b, d, f],
    ]);
  }

  return equations;
}

const equations = parseInput(input);

console.log(partOne(equations));
console.log(partTwo(equations));
