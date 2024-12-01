import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-04.txt', 'utf-8');

function partOne(input) {
  const pairs = input.split('\n');

  return pairs.reduce((sum, pair) => {
    const [minA, maxA, minB, maxB] = pair
      .match(/(\d+)-(\d+),(\d+)-(\d+)/)
      .slice(1, 5)
      .map(Number);

    const aContainsB = minA <= minB && maxA >= maxB;
    const bContainsA = minB <= minA && maxB >= maxA;

    if (aContainsB || bContainsA) {
      sum += 1;
    }

    return sum;
  }, 0);
}

function partTwo(input) {
  const pairs = input.split('\n');

  return pairs.reduce((sum, pair) => {
    const [minA, maxA, minB, maxB] = pair
      .match(/(\d+)-(\d+),(\d+)-(\d+)/)
      .slice(1, 5)
      .map(Number);

    const aOverlapsB = maxA >= minB && minA <= maxB;
    const bOverlapsA = minB <= maxA && maxB >= minA;

    if (aOverlapsB || bOverlapsA) {
      sum += 1;
    }

    return sum;
  }, 0);
}

console.log(partOne(input));
console.log(partTwo(input));
