import { readFileSync } from 'fs';
import assert from 'node:assert/strict';

const input = readFileSync('2022/inputs/day-03.txt', 'utf-8');

const findCommon = (arrA, arrB) => {
  const set = new Set(arrA);

  let common = new Set();
  let idx = 0;

  while (idx < arrB.length) {
    if (set.has(arrB[idx])) {
      common.add(arrB[idx]);
    }

    idx += 1;
  }

  assert(common.size > 0, 'No common item types found!');

  return common;
};

const calculatePriority = (itemType) => {
  const asciiCode = itemType.charCodeAt(0);

  if (asciiCode >= 97 && asciiCode <= 122) {
    return asciiCode - 96;
  } else {
    return asciiCode - 38;
  }
};

function partOne(input) {
  const rucksacks = input.split('\n');

  return rucksacks.reduce((sum, rucksack) => {
    const compA = rucksack.substring(0, rucksack.length / 2);
    const compB = rucksack.substring(rucksack.length / 2);

    const [common] = findCommon(compA, compB);
    const prio = calculatePriority(common);

    return sum + prio;
  }, 0);
}

function partTwo(input) {
  const rucksacks = input.split('\n');
  let sum = 0;

  for (let ii = 0; ii < rucksacks.length - 1; ii += 3) {
    const rA = rucksacks[ii];
    const rB = rucksacks[ii + 1];
    const rC = rucksacks[ii + 2];

    const [common] = findCommon(findCommon(rA, rB), rC);
    const prio = calculatePriority(common);

    sum += prio;
  }

  return sum;
}

console.log(partOne(input));
console.log(partTwo(input));
