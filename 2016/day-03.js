const fs = require('fs');
const input = fs.readFileSync('./inputs/day-03.txt', 'utf-8');

console.log(partOne(input).length);
console.log(partTwo(input).length);
// console.log(
//   partTwo(`101 301 501
// 102 302 502
// 103 303 503
// 201 401 601
// 202 402 602
// 203 403 603`)
// );

function partOne(input) {
  return input
    .split('\n')
    .map((line) => {
      const groups = line.split(/(\d+)\s+(\d+)\s+(\d+)/);
      return [groups[1], groups[2], groups[3]].map(Number);
    })
    .filter((sides) => {
      const a = sides[0] < sides[1] + sides[2];
      const b = sides[1] < sides[0] + sides[2];
      const c = sides[2] < sides[0] + sides[1];

      return a && b && c;
    });
}

function partTwo(input) {
  const grid = input.split('\n').map((line) => {
    const groups = line.split(/(\d+)\s+(\d+)\s+(\d+)/);
    return [groups[1], groups[2], groups[3]].map(Number);
  });

  const list = [];

  for (let xx = 0; xx < 3; xx += 1) {
    let partial = [];
    for (let yy = 0; yy < grid.length; yy += 1) {
      partial.push(grid[yy][xx]);

      if ((yy + 1) % 3 === 0) {
        list.push(partial);
        partial = [];
      }
    }
  }

  return list.filter((sides) => {
    const a = sides[0] < sides[1] + sides[2];
    const b = sides[1] < sides[0] + sides[2];
    const c = sides[2] < sides[0] + sides[1];

    return a && b && c;
  });
}
