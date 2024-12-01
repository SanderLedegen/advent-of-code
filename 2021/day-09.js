const fs = require('fs');
const input = fs.readFileSync('./inputs/day-09.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const grid = input.split('\n').map((line) => [...line].map(Number));

  const isLocalLowestPoint = (grid, x, y) => {
    let isLowestPoint = true;

    if (x > 0 && grid[y][x - 1] <= grid[y][x]) isLowestPoint = false;
    if (y > 0 && grid[y - 1][x] <= grid[y][x]) isLowestPoint = false;
    if (y < grid.length - 1 && grid[y + 1][x] <= grid[y][x]) isLowestPoint = false;
    if (x < grid[y].length - 1 && grid[y][x + 1] <= grid[y][x]) isLowestPoint = false;

    return isLowestPoint;
  };

  let sumRiskLevels = 0;

  for (let ii = 0; ii < grid.length; ii += 1) {
    for (let jj = 0; jj < grid[ii].length; jj += 1) {
      if (isLocalLowestPoint(grid, jj, ii)) {
        sumRiskLevels += 1 + grid[ii][jj];
      }
    }
  }

  return sumRiskLevels;
}

function partTwo(input) {
  const grid = input.split('\n').map((line) => [...line].map(Number));
  const basins = [];
  const visitedLocations = {};

  const isVisited = (y, x) => visitedLocations[`${y},${x}`];
  const isMaxHeight = (y, x) => grid[y][x] === 9;

  for (let ii = 0; ii < grid.length; ii += 1) {
    for (let jj = 0; jj < grid[ii].length; jj += 1) {
      if (isMaxHeight(ii, jj)) continue;

      let basinSize = 0;
      const stack = [[ii, jj]];

      while (stack.length > 0) {
        const [row, col] = stack.shift();
        if (isVisited(row, col)) continue;

        visitedLocations[`${row},${col}`] = true;
        basinSize += 1;

        if (row > 0 && !isMaxHeight(row - 1, col) && !isVisited(row - 1, col))
          stack.push([row - 1, col]);

        if (col > 0 && !isMaxHeight(row, col - 1) && !isVisited(row, col - 1))
          stack.push([row, col - 1]);

        if (row < grid.length - 1 && !isMaxHeight(row + 1, col) && !isVisited(row + 1, col))
          stack.push([row + 1, col]);

        if (col < grid[row].length - 1 && !isMaxHeight(row, col + 1) && !isVisited(row, col + 1))
          stack.push([row, col + 1]);
      }

      basins.push(basinSize);
    }
  }

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((product, size) => (product *= size), 1);
}
