import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-04.txt', 'utf-8');

const grid = input.split('\n').map((row) => row.split(''));

const checkRight = (grid, x, y) => {
  let amount = 0;

  for (let yy = -1; yy <= 1; yy += 1) {
    if (
      y + yy * 3 >= 0 &&
      y + yy * 3 < grid.length &&
      grid[y + yy][x + 1] === 'M' &&
      grid[y + yy * 2][x + 2] === 'A' &&
      grid[y + yy * 3][x + 3] === 'S'
    ) {
      amount += 1;
    }
  }

  return amount;
};

const checkLeft = (grid, x, y) => {
  let amount = 0;

  for (let yy = -1; yy <= 1; yy += 1) {
    if (
      y + yy * 3 >= 0 &&
      y + yy * 3 < grid.length &&
      grid[y + yy][x - 1] === 'M' &&
      grid[y + yy * 2][x - 2] === 'A' &&
      grid[y + yy * 3][x - 3] === 'S'
    ) {
      amount += 1;
    }
  }

  return amount;
};

const checkUpDown = (grid, x, y) => {
  let amount = 0;

  if (y >= 3 && grid[y - 1][x] === 'M' && grid[y - 2][x] === 'A' && grid[y - 3][x] === 'S') {
    amount += 1;
  }

  if (
    y < grid.length - 3 &&
    grid[y + 1][x] === 'M' &&
    grid[y + 2][x] === 'A' &&
    grid[y + 3][x] === 'S'
  ) {
    amount += 1;
  }

  return amount;
};

const checkDiagonally = (grid, x, y) => {
  if (!(y > 0 && x > 0 && y < grid.length - 1 && x < grid[y].length - 1)) {
    return false;
  }

  const topLeft = grid[y - 1][x - 1];
  const bottomRight = grid[y + 1][x + 1];
  const topRight = grid[y - 1][x + 1];
  const bottomLeft = grid[y + 1][x - 1];
  let a = false;
  let b = false;

  if ((topLeft === 'M' && bottomRight === 'S') || (topLeft === 'S' && bottomRight === 'M')) {
    a = true;
  }

  if (a && ((topRight === 'M' && bottomLeft === 'S') || (topRight === 'S' && bottomLeft === 'M'))) {
    b = true;
  }

  return a && b;
};

function partOne(grid) {
  let amount = 0;

  for (let yy = 0; yy < grid.length; yy += 1) {
    for (let xx = 0; xx < grid[yy].length; xx += 1) {
      if (grid[yy][xx] !== 'X') continue;

      if (xx < grid[yy].length - 3) {
        amount += checkRight(grid, xx, yy);
      }

      if (xx >= 3) {
        amount += checkLeft(grid, xx, yy);
      }

      amount += checkUpDown(grid, xx, yy);
    }
  }

  return amount;
}

function partTwo(grid) {
  let amount = 0;

  for (let yy = 0; yy < grid.length; yy += 1) {
    for (let xx = 0; xx < grid[yy].length; xx += 1) {
      if (grid[yy][xx] !== 'A') continue;

      amount += checkDiagonally(grid, xx, yy) ? 1 : 0;
    }
  }

  return amount;
}

console.log(partOne(grid));
console.log(partTwo(grid));
