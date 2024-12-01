import { readFileSync } from 'fs';

let input = readFileSync('2022/inputs/day-06.txt', 'utf-8');

const findMarkerIndex = (input, numDistinctMarkers) => {
  for (let markerIdx = 0; markerIdx < input.length - numDistinctMarkers; markerIdx += 1) {
    const arr = [];

    for (let ii = 0; ii < numDistinctMarkers; ii += 1) {
      arr.push(input[markerIdx + ii]);
    }

    if (arr.length === new Set(arr).size) {
      return markerIdx + numDistinctMarkers;
    }
  }

  throw new Error('No marker found');
}

function partOne(input) {
  return findMarkerIndex(input, 4);
}

function partTwo(input) {
  return findMarkerIndex(input, 14);
}

console.log(partOne(input));
console.log(partTwo(input));
