const fs = require('fs');
let input = fs.readFileSync('./inputs/day-09.txt', 'utf-8');

const solutionPartOne = partOne(input);
console.log(solutionPartOne);
console.log(partTwo(input, solutionPartOne));

function partOne(input, preambleSize = 25) {
  const numbers = input.split('\n').map(Number);

  let idx = preambleSize - 1;

  while (idx < numbers.length) {
    idx += 1;

    let numToTest = numbers[idx];
    let valid = false;

    for (let ii = idx - preambleSize - 1; ii < idx && !valid; ii += 1) {
      for (let jj = ii + 1; jj < idx && !valid; jj += 1) {
        if (numbers[ii] + numbers[jj] === numToTest) {
          valid = true;
        }
      }
    }

    if (!valid) {
      return numToTest;
    }
  }
}

function partTwo(input, num) {
  const numbers = input.split('\n').map(Number);

  for (let ii = 0; ii < numbers.length - 1; ii++) {
    let idx = ii;
    let sum = 0;

    while (sum < num && idx < numbers.length) {
      sum += numbers[idx];

      if (sum === num && ii !== idx) {
        const range = numbers.slice(ii, idx + 1);
        return Math.min(...range) + Math.max(...range);
      }

      idx += 1;
    }
  }
}
