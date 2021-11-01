const fs = require('fs');
let input = fs.readFileSync('./inputs/day-09.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(compressed) {
  let length = 0;
  let pointer = 0;

  while (pointer < compressed.length) {
    const char = compressed[pointer];

    if (char === '(') {
      const matchResult = compressed.slice(pointer).match(/\((\d+)x(\d+)\)/);
      const numChars = +matchResult[1];
      const numRepetitions = +matchResult[2];
      const markerLength = `(${numChars}x${numRepetitions})`.length;
      length += numChars * numRepetitions;
      pointer += markerLength + numChars;
    } else {
      length += 1;
      pointer += 1;
    }
  }

  return length;
}

function partTwo(compressed) {
  let length = 0;
  let pointer = 0;

  while (pointer < compressed.length) {
    const char = compressed[pointer];

    if (char === '(') {
      const matchResult = compressed.slice(pointer).match(/\((\d+)x(\d+)\)/);
      const numChars = +matchResult[1];
      const numRepetitions = +matchResult[2];
      const markerLength = `(${numChars}x${numRepetitions})`.length;
      const section = compressed.substr(pointer + markerLength, numChars);

      length += numRepetitions * partTwo(section);
      pointer += markerLength + numChars;
    } else {
      length += 1;
      pointer += 1;
    }
  }

  return length;
}
