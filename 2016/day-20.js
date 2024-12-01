const fs = require('fs');
const input = fs.readFileSync('./inputs/day-20.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const lines = input.split('\n');
  let lowestValue = 0;

  for (let ii = 0; ii < lines.length; ii += 1) {
    const [min, max] = lines[ii].split('-').map(Number);

    if (lowestValue >= min && lowestValue <= max) {
      lowestValue = max + 1;
      ii = -1; // Reset for loop
    }
  }

  return lowestValue;
}

function partTwo(input) {
  const sortedLines = input.split('\n').sort((a, b) => {
    const [minA,] = a.split('-').map(Number);
    const [minB,] = b.split('-').map(Number);

    return minA - minB;
  });

  let numValidAddresses = 0;
  let previousMax = 0;

  for (let ii = 0; ii < sortedLines.length; ii += 1) {
    const [min, max] = sortedLines[ii].split('-').map(Number);

    const diff = min - previousMax;

    if (diff > 0) {
      numValidAddresses += min - previousMax - 1;
    }

    previousMax = Math.max(max, previousMax);
  }

  numValidAddresses += 2**32 - 1 - previousMax;

  return numValidAddresses;
}