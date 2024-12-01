const fs = require('fs');
const input = fs.readFileSync('./inputs/day-05.txt', 'utf-8');

const niceFilter = (string) => {
  const comboCheck = /(?:ab|cd|pq|xy)/.test(string);
  if (comboCheck) {
    return false;
  };

  const vowelCheck = /(?:\w*[a|e|i|o|u]+){3}\w*/.test(string);
  if (!vowelCheck) {
    return false;
  }

  const doubleLetterCheck = /(\w)\1/.test(string);
  if (!doubleLetterCheck) {
    return false;
  }

  return true;
};

const smarterNiceFilter = (string) => {
  const repeatingLetterWithAnotherInBetweenCheck = /(\w)\w\1/.test(string);
  if (!repeatingLetterWithAnotherInBetweenCheck) {
    return false;
  }

  const pairAppearingTwiceWithoutOverlapCheck = /(\w\w)\w*\1/.test(string);
  if (!pairAppearingTwiceWithoutOverlapCheck) {
    return false;
  }

  return true;
};

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  return input
    .split('\n')
    .filter(niceFilter)
    .length;
}

function partTwo(input) {
  return input
    .split('\n')
    .filter(smarterNiceFilter)
    .length;
}
