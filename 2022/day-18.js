import { readFileSync } from 'fs';

let input = readFileSync('2022/inputs/day-18.txt', 'utf-8');

const manhattanDistance = (x1, y1, z1, x2, y2, z2) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2);

function partOne(input) {
  const coords = input.split('\n').map(line => line.split(',').map(Number));
  const map = new Map();

  for (let ii = 0; ii < coords.length; ii += 1) {
    for (let jj = 0; jj < coords.length; jj += 1) {
      if (ii === jj) continue;
      const [x1, y1, z1] = coords[ii];
      const [x2, y2, z2] = coords[jj];
      const key = `${x1},${y1},${z1}`;
      
      if (!map.has(key)) {
        map.set(key, 0);
      }

      const cubesConnected = manhattanDistance(x1, y1, z1, x2, y2, z2) === 1;

      if (cubesConnected) {
        map.set(key, map.get(key) + 1);
      }
    }
  }

  return Array.from(map.values()).reduce((total, sidesCovered) => total + 6 - sidesCovered, 0);
}

function partTwo(input) {
  //
}

console.log(partOne(input));
console.log(partTwo(input));
