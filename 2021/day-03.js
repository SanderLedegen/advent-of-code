const fs = require('fs');
let input = fs.readFileSync('./inputs/day-03.txt', 'utf-8');

const binaryNumbers = input.split('\n');

const countBits = (values, position) => {
  let numOnes = 0;

  for (let jj = 0; jj < values.length; jj += 1) {
    numOnes += +values[jj][position];
  }

  return {
    ones: numOnes,
    zeros: values.length - numOnes,
  };
};

console.log(partOne(binaryNumbers));
console.log(partTwo(binaryNumbers));

function partOne(binaryNumbers) {
  let gammaRateString = '';
  let epsilonRateString = '';

  for (let ii = 0; ii < binaryNumbers[0].length; ii += 1) {
    const { ones, zeros } = countBits(binaryNumbers, ii);
    gammaRateString += +(ones > zeros);
    epsilonRateString += +!(ones > zeros);
  }

  const gammaRate = parseInt(gammaRateString, 2);
  const epsilonRate = parseInt(epsilonRateString, 2);

  return gammaRate * epsilonRate;
}

function partTwo(binaryNumbers) {
  const calculateRating = (numbers, predicate) => {
    let values = numbers.slice(0);
    let position = 0;

    while (values.length > 1) {
      const { ones, zeros } = countBits(values, position);

      values = values.filter(predicate(ones, zeros, position));

      position += 1;
    }

    return parseInt(values[0], 2);
  };

  const oxygenBitCriteria = (ones, zeros, position) => (value) => {
    return value[position] == +(ones >= zeros);
  };

  const carbonBitCriteria = (ones, zeros, position) => (value) => {
    return value[position] == +!(ones >= zeros);
  };

  const oxygenGeneratorRating = calculateRating(binaryNumbers, oxygenBitCriteria);
  const carbonScrubberRating = calculateRating(binaryNumbers, carbonBitCriteria);

  return oxygenGeneratorRating * carbonScrubberRating;
}
