import assert from 'assert';
import { readFileSync } from 'fs';

const input = readFileSync('2023/inputs/day-01.txt', 'utf-8');
const lines = input.split('\n');

const matchDigits = (line) => {
  const a = line.match(/[0-9]/)?.at(0);
  const b = line.split('').reverse().join('').match(/[0-9]/)?.at(0);

  assert(a, `First digit not found in '${line}'.`);
  assert(b, `Last digit not found in '${line}'.`);

  return [a, b];
};
const matchDigitsAndSpelledOut = (line) => {
  const table = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
  };
  let a = line.match(/[0-9]|one|two|three|four|five|six|seven|eight|nine/)?.at(0);
  let b = line.match(/[0-9]|one|two|three|four|five|six|seven|eight|nine/g)?.at(-1);

  assert(a, `First digit not found in '${line}'.`);
  assert(b, `Last digit not found in '${line}'.`);

  if (Object.keys(table).includes(a)) {
    a = table[a];
  }

  if (Object.keys(table).includes(b)) {
    b = table[b];
  }

  return [a, b];
};
const concatDigitsAndCast = ([a, b]) => +`${a}${b}`;
const sumUpValues = (sum, num) => sum + num;

function partOne(lines) {
  return lines
    .map(matchDigits)
    .map(concatDigitsAndCast)
    .reduce(sumUpValues);
}

function partTwo(lines) {
  return lines
    .map(matchDigitsAndSpelledOut)
    .map(concatDigitsAndCast)
    .reduce(sumUpValues);
}

console.log(partOne(lines));
console.log(partTwo(lines));
