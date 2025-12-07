import { readFileSync } from 'fs';

const input = readFileSync('2025/inputs/day-05.txt', 'utf-8');

function partOne({ ranges, ids }) {
  let numFresh = 0;

  for (const id of ids) {
    const isFresh = ranges.some(([start, end]) => {
      return id >= start && id <= end;
    });

    if (isFresh) numFresh += 1;
  }

  return numFresh;
}

function partTwo({ ranges }) {
  let sortedRanges = ranges.toSorted(([s1, e1], [s2, e2]) => s1 - s2);
  let didModify = true;
  
  while (didModify) {
    let newRanges = [sortedRanges[0]];
    didModify = false;

    for (let ii = 1; ii < sortedRanges.length; ii += 1) {
      const [start, end] = sortedRanges[ii];
      const [prevStart, prevEnd] = newRanges.at(-1);

      if (start >= prevStart && start <= prevEnd) {
        didModify = true;
        const min = Math.min(prevStart, start);
        const max = Math.max(prevEnd, end);
        newRanges.at(-1)[0] = min;
        newRanges.at(-1)[1] = max;
      } else {
        newRanges.push([start, end]);
      }
    }

    sortedRanges = newRanges;
  }

  return sortedRanges.reduce((total, [start, end]) => (total + end - start + 1), 0);
}

function parseInput(input) {
  const ranges = [];
  const ids = [];
  const lines = input.split('\n');
  let parsingRanges = true;

  for (const line of lines) {
    if (line === '') {
      parsingRanges = false;
      continue;
    };

    if (parsingRanges) {
      const [start, end] = line.split('-').map(Number);
      ranges.push([start, end]);
    } else {
      ids.push(Number(line));
    }
  }

  return { ranges, ids };
}

const parsedInput = parseInput(input);

console.log(partOne(parsedInput));
console.log(partTwo(parsedInput));
