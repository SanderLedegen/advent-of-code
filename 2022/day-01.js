import { readFileSync } from 'fs';
const input = readFileSync('2022/inputs/day-01.txt', 'utf-8');

const calsPerElf = (lines) => {
  return lines.reduce(
    (acc, line) => {
      if (line === '') {
        acc.push(0);
        return acc;
      }

      acc[acc.length - 1] += Number(line);

      return acc;
    },
    [0]
  );
};

function partOne(input) {
  const lines = input.split('\n');
  const calories = calsPerElf(lines);

  return Math.max(...calories);
}

function partTwo(input) {
  const lines = input.split('\n');
  const calories = calsPerElf(lines);

  const sorted = calories.sort((a, b) => b - a);

  return sorted[0] + sorted[1] + sorted[2];
}

console.log(partOne(input));
console.log(partTwo(input));
