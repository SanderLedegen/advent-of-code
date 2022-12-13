import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-13.txt', 'utf-8');

const isRightOrder = (pairA, pairB) => {
  const maxLength = Math.max(pairA.length, pairB.length);

  for (let ii = 0; ii < maxLength; ii += 1) {
    let left = pairA[ii];
    let right = pairB[ii];

    const leftIsArray = Array.isArray(left);
    const rightIsArray = Array.isArray(right);

    if (left === undefined && right === undefined) {
      continue;
    } else if (left === undefined) {
      return true;
    } else if (right === undefined) {
      return false;
    }

    if (!leftIsArray && !rightIsArray) {
      if (left > right) {
        return false;
      } else if (left < right) {
        return true;
      } else {
        continue;
      }
    }

    if (!leftIsArray) {
      left = [left];
    }

    if (!rightIsArray) {
      right = [right];
    }

    const result = isRightOrder(left, right);

    // A result is null when comparing two empty lists (i.e. [] and []) which
    // requires a new round, comparing the next items.
    if (result !== null) {
      return result;
    }
  }

  return null;
};

function partOne(pairs) {
  let sum = 0;

  for (let idx = 0; idx < pairs.length; idx += 1) {
    const [pairA, pairB] = pairs[idx];

    if (isRightOrder(pairA, pairB)) {
      sum += idx + 1;
    }
  }

  return sum;
}

function partTwo(input) {
  const divPackets = ['[[2]]', '[[6]]'];

  return input
    .split('\n')
    .filter((line) => line !== '')
    .reduce((lines, line) => [...lines, line], divPackets)
    .map(JSON.parse)
    .sort((a, b) => (isRightOrder(a, b) ? -1 : 1))
    .reduce((key, packet, idx) => key * (divPackets.includes(JSON.stringify(packet)) ? (idx + 1) : 1), 1);
}

const pairs = [];
const lines = input.split('\n');
for (let ii = 0; ii < lines.length; ii += 3) {
  const a = JSON.parse(lines[ii]);
  const b = JSON.parse(lines[ii + 1]);
  pairs.push([a, b]);
}

console.log(partOne(pairs));
console.log(partTwo(input));
