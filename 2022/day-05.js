import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-05.txt', 'utf-8');

const parseInput = (input) => {
  const lines = input.split('\n');
  const ret = { steps: [], stacks: [] };
  let emptyLineIdx = 0;

  // Steps
  for (let ii = 0; ii < lines.length; ii += 1) {
    const line = lines[ii];

    if (line === '') {
      emptyLineIdx = ii;
    } else if (line.startsWith('move')) {
      const [amount, from, to] = line
        .match(/(\d+).*(\d+).*(\d+)/)
        .slice(1, 4)
        .map(Number);
      ret.steps.push({ amount, from, to });
    }
  }

  // Stacks
  const numStacks = +lines[emptyLineIdx - 1].match(/\d $/).at(0).trim();
  ret.stacks = new Array(numStacks);

  for (let ii = 0; ii < numStacks; ii += 1) {
    ret.stacks[ii] = new Array();
  }

  for (let ii = emptyLineIdx - 2; ii >= 0; ii -= 1) {
    const line = lines[ii];

    for (let jj = 1; jj < line.length; jj += 4) {
      const char = line[jj];
      
      if (char !== ' ') {
        ret.stacks[(jj - 1) / 4].push(char);
      }
    }
  }

  return ret;
};

function partOne(input) {
  const { steps, stacks } = parseInput(input);

  steps.forEach((step) => {
    for (let ii = 0; ii < step.amount; ii += 1) {
      const popped = stacks[step.from - 1].pop();
      stacks[step.to - 1].push(popped);
    }
  });

  return stacks.reduce((message, stack) => {
    const topOfStack = stack.at(-1);
    return message + topOfStack;
  }, '');
}

function partTwo(input) {
  const { steps, stacks } = parseInput(input);

  steps.forEach((step) => {
    let arr = [];

    for (let ii = 0; ii < step.amount; ii += 1) {
      const popped = stacks[step.from - 1].pop();
      arr.push(popped);
    }

    stacks[step.to - 1].push(...arr.reverse());
  });

  return stacks.reduce((message, stack) => {
    const topOfStack = stack.at(-1);
    return message + topOfStack;
  }, '');
}

console.log(partOne(input));
console.log(partTwo(input));
