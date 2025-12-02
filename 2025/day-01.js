import { readFileSync } from 'fs';

const input = readFileSync('2025/inputs/day-01.txt', 'utf-8');

function partOne(input) {
  let amountZeroEncountered = 0;
  let pos = 50;

  for (const [dir, amount] of input) {
    if (dir === 'L') {
      pos -= amount;
    } else if (dir === 'R') {
      pos += amount;
    }

    while (pos < 0) pos += 100;
    while (pos > 99) pos -= 100;

    if (pos === 0) amountZeroEncountered += 1;
  }

  return amountZeroEncountered;
}

function partTwo(input) {
  let amountZeroEncountered = 0;
  let pos = 50;

  for (const [dir, amount] of input) {
    if (dir === 'L') {
      pos -= amount;
    } else if (dir === 'R') {
      pos += amount;
    }

    while (pos < 0) {
      if (pos + amount !== 0) amountZeroEncountered += 1;
      pos += 100;
    };

    while (pos > 99) {
      if (pos !== 100) amountZeroEncountered += 1;
      pos -= 100;
    };

    if (pos === 0) amountZeroEncountered += 1;
  }

  return amountZeroEncountered;
}

function parseInput(input) {
  const lines = input.split('\n');
  return lines.map((line) => ([line.at(0), +line.slice(1)]));
}

const parsedInput = parseInput(input);

console.log(partOne(parsedInput));
console.log(partTwo(parsedInput));