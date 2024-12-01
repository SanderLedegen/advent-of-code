const fs = require('fs');
const input = fs.readFileSync('./inputs/day-01.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const list = input.split('\n').map(Number);

  const belowList = list.filter(n => n < 1010);
  const aboveList = list.filter(n => n >= 1010);

  for (let below = 0; below < belowList.length; below++) {
    for (let above = 0; above < aboveList.length; above++) {
      if (belowList[below] + aboveList[above] === 2020) {
        return belowList[below] * aboveList[above];
      }
    }
  }
}

function partTwo(input) {
  const list = input.split('\n').map(Number);

  for (let ii = 0; ii < list.length; ii++) {
    for (let jj = ii + 1; jj < list.length; jj++) {
      for (let kk = jj + 1; kk < list.length; kk++) {
        if (list[ii] + list[jj] + list[kk] === 2020) {
          return list[ii] * list[jj] * list[kk];
        }
      }
    }
  }
}
