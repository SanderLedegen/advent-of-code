const fs = require('fs');
let input = fs.readFileSync('./inputs/day-13.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const lines = input.split('\n');
  const timestamp = +lines[0];
  const busIds = lines[1]
    .split(',')
    .filter((c) => !isNaN(c))
    .map(Number);

  let t = 0;

  while (true) {
    for (let busIdx = 0; busIdx < busIds.length; busIdx += 1) {
      const busId = busIds[busIdx];

      if ((timestamp + t) % busId === 0) {
        return t * busId;
      }
    }

    t += 1;
  }
}

function partTwo(input) {
  const allBusIds = input
    .split('\n')[1]
    .split(',')
    .map((c) => (isNaN(c) ? undefined : +c));

  const definedBusIds = allBusIds.filter((c) => !isNaN(c));

  let time = 0;
  let step = 1;

  for (let jj = 0; jj < definedBusIds.length - 1; jj += 1) {
    const currBus = definedBusIds[jj];
    const nextBus = definedBusIds[jj + 1];
    const timeDiffNextBus = allBusIds.indexOf(nextBus);
    step *= currBus;

    while ((time + timeDiffNextBus) % nextBus !== 0) {
      time += step;
    }
  }

  return time;
}
