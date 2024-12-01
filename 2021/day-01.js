const fs = require('fs');
const input = fs.readFileSync('./inputs/day-01.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const depths = input.split('\n').map(Number);

  return depths.reduce((numIncreases, depth, idx) => {
    if (idx > 0 && depth > depths[idx - 1]) {
      return numIncreases + 1;
    }

    return numIncreases;
  }, 0);
}

function partTwo(input) {
  const depths = input.split('\n').map(Number);

  const res = depths.reduce(
    (a, depth, idx) => {
      const sum = depth + (depths[idx + 1] || 0) + (depths[idx + 2] || 0);

      if (sum > a.prevSum && idx > 0) {
        a.numLargerSums += 1;
      }

      a.prevSum = sum;

      return { numLargerSums: a.numLargerSums, prevSum: a.prevSum };
    },
    { numLargerSums: 0, prevSum: 0 }
  );

  return res.numLargerSums;
}
