import { readFileSync } from 'fs';

const input = readFileSync('2025/inputs/day-04.txt', 'utf-8');

const getNumRolls = (grid, x, y) => {
  let numRolls = 0;

  for (let yy = -1; yy <= 1; yy += 1) {
    for (let xx = -1; xx <= 1; xx += 1) {
      if (xx === 0 && yy === 0) continue;
      if (grid.has(`${x + xx},${y + yy}`)) numRolls += 1;
    }
  }

  return numRolls;
};

function partOne(grid) {
  let numCanAccess = 0;

  for (const pos of grid.values()) {
    const [x, y] = pos.split(',').map(Number);
    const numRolls = getNumRolls(grid, x, y);
    if (numRolls < 4) numCanAccess += 1;
  }

  return numCanAccess;
}

function partTwo(grid) {
  let numRemoved = 0;
  let totalNumRolls = -1;

  while (totalNumRolls !== grid.size) {
    totalNumRolls = grid.size;

    for (const pos of grid.values()) {
      const [x, y] = pos.split(',').map(Number);
      const numRolls = getNumRolls(grid, x, y);
      if (numRolls < 4) {
        numRemoved += 1
        grid.delete(`${x},${y}`);
      };
    }
  }

  return numRemoved;
}

const grid = input.split('\n').reduce((set, line, yIdx) => {
  line.split('').forEach((pos, xIdx) => {
    if (pos === '@') set.add(`${xIdx},${yIdx}`);
  });
  return set;
}, new Set());

console.log(partOne(grid));
console.log(partTwo(grid));
