const fs = require('fs');
const input = fs.readFileSync('./inputs/day-01.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  return input
    .split('')
    .reduce((floor, char) => {
      return floor + (char === '(' ? 1 : -1);
    }, 0);
}

function partTwo(input) {
  let pos;

  input
    .split('')
      .reduce((floor, char, idx) => {
        const newFloor = floor + (char === '(' ? 1 : -1);
        if (!pos && newFloor === -1) {
          pos = idx + 1;
        }
        return newFloor;
      }, 0);

  return pos;
}
