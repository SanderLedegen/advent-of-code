const fs = require('fs');
const input = fs.readFileSync('./inputs/day-08.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  return input.split('\n').reduce((count, line) => {
    return count + line.length - eval(line).length;
  }, 0);
}

function partTwo(input) {
  return input.split('\n').reduce((count, line) => {
    const escapedLength = (line.match(/"/g) || []).length + (line.match(/\\/g) || []).length;

    return count + 2 + escapedLength;
  }, 0);
}
