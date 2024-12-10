import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-07.txt', 'utf-8');

function isPossible(result, numbers) {
  const sum = numbers.reduce((sum, number) => sum + number, 0);
  if (result === sum) return true;

  if (numbers.length === 1) return false;

  const product = numbers.reduce((product, number) => product * number, 1);
  if (result === product) return true;

  const last = numbers.at(-1);

  if (last === undefined) return false;

  let resMin = false;
  let resDivide = false;
  resMin = isPossible(result - last, numbers.slice(0, -1));

  if (!resMin && last !== 0 && result % last === 0) {
    resDivide = isPossible(result / last, numbers.slice(0, -1));
  }

  return resMin || resDivide;
}

function isPossiblePartTwo(result, numbers) {
  const sum = numbers.reduce((sum, number) => sum + number, 0);
  if (result === sum) return true;

  if (numbers.length <= 1) return false;

  const product = numbers.reduce((product, number) => product * number, 1);
  if (result === product) return true;

  const concatenation = Number(numbers.join(''));
  if (numbers.length === 2 && result === concatenation) return true;

  const last = numbers.at(-1);

  let resMin = false;
  let resDivide = false;
  let resConcat = false;

  if (result - last > 0) {
    resMin = isPossiblePartTwo(result - last, numbers.slice(0, -1));
  }

  if (!resMin && last !== 0 && result % last === 0) {
    resDivide = isPossiblePartTwo(result / last, numbers.slice(0, -1));
  }

  if (!resMin && !resDivide && `${result}`.endsWith(`${last}`)) {
    const idx = `${result}`.lastIndexOf(`${last}`);
    const newResult = Number(`${result}`.slice(0, idx));
    resConcat = isPossiblePartTwo(newResult, numbers.slice(0, -1));
  }

  return resMin || resDivide || resConcat;
}

function partOne(input) {
  return input
    .split('\n')
    .map((line) => {
      return [...line.match(/(\d+)/g)].map(Number);
    })
    .filter(([result, ...numbers]) => isPossible(result, numbers))
    .reduce((sum, [result]) => sum + result, 0);
}

function partTwo(input) {
  return input
    .split('\n')
    .map((line) => {
      return [...line.match(/(\d+)/g)].map(Number);
    })
    .filter(([result, ...numbers]) => isPossiblePartTwo(result, numbers))
    .reduce((sum, [result]) => sum + result, 0);
}

console.log(partOne(input));
console.log(partTwo(input));
