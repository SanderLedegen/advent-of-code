const fs = require('fs');
let input = fs.readFileSync('./inputs/day-11.txt', 'utf-8');

const countAdjacentOccupiedSeats = (grid, y, x) => {
  let minY = Math.max(y - 1, 0);
  let maxY = Math.min(y + 1, grid.length - 1);
  let minX = Math.max(x - 1, 0);
  let maxX = Math.min(x + 1, grid[y].length - 1);
  let numOccupiedSeats = 0;

  for (let yy = minY; yy <= maxY; yy += 1) {
    for (let xx = minX; xx <= maxX; xx += 1) {
      if (yy === y && xx === x) {
        continue;
      }

      if (grid[yy][xx] === '#') {
        numOccupiedSeats += 1;
      }
    }
  }

  return numOccupiedSeats;
}

const countVisibleOccupiedSeats = (grid, y, x) => {
  let numOccupiedSeats = 0;

  for (let yy = -1; yy <= 1; yy += 1) {
    for (let xx = -1; xx <= 1; xx += 1) {
      if (yy === 0 && xx === 0) {
        continue;
      }

      let seatFound = '';
      let distanceY = 0;
      let distanceX = 0;

      while (!seatFound) {
        const yyy = y + yy + distanceY;
        const xxx = x + xx + distanceX;

        if (yyy === -1 || yyy === grid.length) {
          break;
        }

        if (xxx === -1 || xxx === grid[yyy].length) {
          break;
        }

        if (grid[yyy][xxx] !== '.') {
          seatFound = grid[y + yy + distanceY][xxx];
        }

        distanceY += yy;
        distanceX += xx;
      }

      if (seatFound === '#') {
        numOccupiedSeats += 1;
      }
    }
  }

  return numOccupiedSeats;
}

function mutate(countMethod, occupiedLimit) {
  let grid = parseInput(input);
  let isMutating = true;

  while (isMutating) {
    const newGrid = JSON.parse(JSON.stringify(grid));

    for (let yy = 0; yy < grid.length; yy += 1) {
      for (let xx = 0; xx < grid[yy].length; xx += 1) {
        const occupiedSeats = countMethod(grid, yy, xx);

        if (grid[yy][xx] === 'L' && occupiedSeats === 0) {
          newGrid[yy][xx] = '#';
        }

        if (grid[yy][xx] === '#' && occupiedSeats >= occupiedLimit) {
          newGrid[yy][xx] = 'L';
        }
      }
    }

    isMutating = JSON.stringify(grid) !== JSON.stringify(newGrid);

    grid = newGrid;
  }

  let numOccupiedSeats = 0;
  for (let yy = 0; yy < grid.length; yy += 1) {
    for (let xx = 0; xx < grid[yy].length; xx += 1) {
      numOccupiedSeats += grid[yy][xx] === '#' ? 1 : 0;
    }
  }

  return numOccupiedSeats;
}

console.log(partOne());
console.log(partTwo());

function partOne() {
  return mutate(countAdjacentOccupiedSeats, 4);
}

function partTwo() {
  return mutate(countVisibleOccupiedSeats, 5);
}

function parseInput(input) {
  const lines = input.split('\n');
  const grid = new Array(lines.length);

  for (let yy = 0; yy < lines.length; yy += 1) {
    grid[yy] = new Array(lines[yy].length);
    const line = lines[yy].split('');

    for (let xx = 0; xx < lines[yy].length; xx += 1) {
      grid[yy][xx] = line[xx];
    }
  }

  return grid;
}
