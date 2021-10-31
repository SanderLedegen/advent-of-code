const fs = require('fs');
let input = fs.readFileSync('./inputs/day-15.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const discs = parseInput(input);
  let solutionFound = false;
  let time = -1;

  while (!solutionFound) {
    time += 1;

    solutionFound = discs.every((disc) => {
      return (disc.pos + time + disc.discNo) % disc.numPositions === 0;
    });
  }

  return time;
}

function partTwo(input) {
  const discs = parseInput(input);
  discs.push({
    discNo: 7,
    numPositions: 11,
    time: 0,
    pos: 0,
  });

  let solutionFound = false;
  let time = -1;

  while (!solutionFound) {
    time += 1;

    solutionFound = discs.every((disc) => {
      return (disc.pos + time + disc.discNo) % disc.numPositions === 0;
    });
  }

  return time;
}

function parseInput(input) {
  const discs = [];
  const lines = input.split('\n');
  const regex = /#(\d+) has (\d+) positions; at time=(\d+), it is at position (\d+)./;

  for (const line of lines) {
    const matches = line.match(regex);
    discs.push({
      discNo: +matches[1],
      numPositions: +matches[2],
      time: +matches[3],
      pos: +matches[4],
    });
  }

  return discs;
}
