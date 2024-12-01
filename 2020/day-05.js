const fs = require('fs');
let input = fs.readFileSync('./inputs/day-05.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  return input.split('\n').reduce((max, line) => {
    const rowBinaryString = line
      .substring(0, 7)
      .replace(/F/gi, '0')
      .replace(/B/gi, '1');

    const colBinaryString = line
      .substring(7)
      .replace(/L/gi, '0')
      .replace(/R/gi, '1');

    const row = parseInt(rowBinaryString, 2);
    const col = parseInt(colBinaryString, 2);

    return Math.max(row * 8 + col, max);
  }, 0);
}

function partTwo(input) {
  const seats = input.split('\n').reduce((seats, line) => {
    const rowBinaryString = line
      .substring(0, 7)
      .replace(/F/gi, '0')
      .replace(/B/gi, '1');

    const colBinaryString = line
      .substring(7)
      .replace(/L/gi, '0')
      .replace(/R/gi, '1');

    const row = parseInt(rowBinaryString, 2);
    const col = parseInt(colBinaryString, 2);

    seats.push(row * 8 + col);

    return seats;
  }, []);

  seats.sort((a, b) => a - b);
  
  for (let seat = seats[0]; seat < seats[seats.length - 1]; seat += 1) {
    if (seat !== seats[seat - seats[0]]) {
      return seat;
    }
  }
}
