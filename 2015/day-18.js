const fs = require('fs');
let input = fs.readFileSync('./inputs/day-18.txt', 'utf-8');

const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input, steps = 100) {
  let grid = parseInput(input);

  for (let step = 1; step <= steps; step += 1) {
    const newGrid = JSON.parse(JSON.stringify(grid));

    for (let yy = 0; yy < GRID_HEIGHT; yy += 1) {
      for (let xx = 0; xx < GRID_WIDTH; xx += 1) {
        const numActiveNeighbours = countActiveLights(grid, yy, xx);

        if (grid[yy][xx] === '#') {
          newGrid[yy][xx] = [2, 3].includes(numActiveNeighbours) ? '#' : '.';
        } else {
          newGrid[yy][xx] = numActiveNeighbours === 3 ? '#' : '.';
        }
      }
    }

    grid = newGrid;
  }

  let sum = 0;

  for (let yy = 0; yy < GRID_HEIGHT; yy += 1) {
    for (let xx = 0; xx < GRID_WIDTH; xx += 1) {
      sum += grid[yy][xx] === '#' ? 1 : 0;
    }
  }

  return sum;
}

function partTwo(input, steps = 100) {
  let grid = parseInput(input);

  for (let step = 1; step <= steps; step += 1) {
    // Lights that are stuck in 'on' state
    grid[0][0] = '#';
    grid[0][GRID_WIDTH - 1] = '#';
    grid[GRID_HEIGHT - 1][0] = '#';
    grid[GRID_HEIGHT - 1][GRID_WIDTH - 1] = '#';

    const newGrid = JSON.parse(JSON.stringify(grid));

    for (let yy = 0; yy < GRID_HEIGHT; yy += 1) {
      for (let xx = 0; xx < GRID_WIDTH; xx += 1) {
        const numActiveNeighbours = countActiveLights(grid, yy, xx);

        if (grid[yy][xx] === '#') {
          newGrid[yy][xx] = [2, 3].includes(numActiveNeighbours) ? '#' : '.';
        } else {
          newGrid[yy][xx] = numActiveNeighbours === 3 ? '#' : '.';
        }
      }
    }

    // Lights that are stuck in 'on' state
    newGrid[0][0] = '#';
    newGrid[0][GRID_WIDTH - 1] = '#';
    newGrid[GRID_HEIGHT - 1][0] = '#';
    newGrid[GRID_HEIGHT - 1][GRID_WIDTH - 1] = '#';

    grid = newGrid;
  }

  let sum = 0;

  for (let yy = 0; yy < GRID_HEIGHT; yy += 1) {
    for (let xx = 0; xx < GRID_WIDTH; xx += 1) {
      sum += grid[yy][xx] === '#' ? 1 : 0;
    }
  }

  return sum;
}

function countActiveLights(grid, y, x) {
  let minY = Math.max(y - 1, 0);
  let maxY = Math.min(y + 1, grid.length - 1);
  let minX = Math.max(x - 1, 0);
  let maxX = Math.min(x + 1, grid[y].length - 1);
  let numActiveLights = 0;

  for (let yy = minY; yy <= maxY; yy += 1) {
    for (let xx = minX; xx <= maxX; xx += 1) {
      if (yy === y && xx === x) {
        continue;
      }

      if (grid[yy][xx] === '#') {
        numActiveLights += 1;
      }
    }
  }

  return numActiveLights;
}

function parseInput(input) {
  const grid = new Array(GRID_HEIGHT).fill('.').map(() => new Array(GRID_WIDTH).fill('.'));
  const lines = input.split('\n');

  for (let yy = 0; yy < GRID_HEIGHT; yy += 1) {
    for (let xx = 0; xx < GRID_WIDTH; xx += 1) {
      grid[yy][xx] = lines[yy][xx];
    }
  }

  return grid;
}
