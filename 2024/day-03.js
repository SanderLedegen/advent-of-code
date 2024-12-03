import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-03.txt', 'utf-8');

function partOne(input) {
  return [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)].reduce((sum, [_, a, b]) => {
    return sum + a * b;
  }, 0);
}

function partTwo(input) {
  const regex = /(?:mul\((\d{1,3}),(\d{1,3})\))|(?:don't\(\))|(?:do\(\))/g;
  let ignore = false;

  return [...input.matchAll(regex)].reduce((sum, [_, a, b]) => {
    if (_ === "don't()") {
      ignore = true;
      return sum;
    }

    if (_ === 'do()') {
      ignore = false;
      return sum;
    }

    if (ignore) {
      return sum;
    }

    return sum + a * b;
  }, 0);
}

console.log(partOne(input));
console.log(partTwo(input));
