const fs = require('fs');
let input = fs.readFileSync('./inputs/day-17.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  let grid = parseInputPartOne(input);
  let cycle = 0;

  const countActiveNeighbours = (grid, y, x, z) => {
    let minY = Math.max(y - 1, 0);
    let maxY = Math.min(y + 1, grid.length - 1);
    let minX = Math.max(x - 1, 0);
    let maxX = Math.min(x + 1, grid[y].length - 1);
    let minZ = Math.max(z - 1, 0);
    let maxZ = Math.min(z + 1, grid[y][x].length - 1);

    let amount = 0;

    for (let yy = minY; yy <= maxY; yy++) {
      for (let xx = minX; xx <= maxX; xx++) {
        for (let zz = minZ; zz <= maxZ; zz++) {
          if (yy === y && xx === x && zz === z) {
            continue;
          }

          amount += grid[yy][xx][zz] === '#' ? 1 : 0;
        }
      }
    }

    return amount;
  };

  while (cycle < 6) {
    const newGrid = JSON.parse(JSON.stringify(grid));

    for (let yy = 0; yy < grid.length; yy++) {
      for (let xx = 0; xx < grid[yy].length; xx++) {
        for (let zz = 0; zz < grid[yy][xx].length; zz++) {
          const state = grid[yy][xx][zz];
          const amount = countActiveNeighbours(grid, yy, xx, zz);

          if (state === '#') {
            if (![2, 3].includes(amount)) {
              newGrid[yy][xx][zz] = '.';
            }
          }

          if (state === '.') {
            if (amount === 3) {
              newGrid[yy][xx][zz] = '#';
            }
          }
        }
      }
    }

    grid = newGrid;

    cycle += 1;
  }

  let count = 0;

  for (let yy = 0; yy < grid.length; yy++) {
    for (let xx = 0; xx < grid[yy].length; xx++) {
      for (let zz = 0; zz < grid[yy][xx].length; zz++) {
        count += grid[yy][xx][zz] === '#' ? 1 : 0;
      }
    }
  }

  return count;
}

function partTwo(input) {
  let grid = parseInputPartTwo(input);
  let cycle = 0;

  const countActiveNeighbours = (grid, y, x, z, w) => {
    let minY = Math.max(y - 1, 0);
    let maxY = Math.min(y + 1, grid.length - 1);
    let minX = Math.max(x - 1, 0);
    let maxX = Math.min(x + 1, grid[y].length - 1);
    let minZ = Math.max(z - 1, 0);
    let maxZ = Math.min(z + 1, grid[y][x].length - 1);
    let minW = Math.max(w - 1, 0);
    let maxW = Math.min(w + 1, grid[y][x][z].length - 1);

    let amount = 0;

    for (let yy = minY; yy <= maxY; yy++) {
      for (let xx = minX; xx <= maxX; xx++) {
        for (let zz = minZ; zz <= maxZ; zz++) {
          for (let ww = minW; ww <= maxW; ww++) {
            if (yy === y && xx === x && zz === z && ww === w) {
              continue;
            }

            amount += grid[yy][xx][zz][ww] === '#' ? 1 : 0;
          }
        }
      }
    }

    return amount;
  };

  while (cycle < 6) {
    const newGrid = JSON.parse(JSON.stringify(grid));

    for (let yy = 0; yy < grid.length; yy++) {
      for (let xx = 0; xx < grid[yy].length; xx++) {
        for (let zz = 0; zz < grid[yy][xx].length; zz++) {
          for (let ww = 0; ww < grid[yy][xx][zz].length; ww++) {
            const state = grid[yy][xx][zz][ww];
            const amount = countActiveNeighbours(grid, yy, xx, zz, ww);

            if (state === '#') {
              if (![2, 3].includes(amount)) {
                newGrid[yy][xx][zz][ww] = '.';
              }
            }

            if (state === '.') {
              if (amount === 3) {
                newGrid[yy][xx][zz][ww] = '#';
              }
            }
          }
        }
      }
    }

    grid = newGrid;

    cycle += 1;
  }

  let count = 0;

  for (let yy = 0; yy < grid.length; yy++) {
    for (let xx = 0; xx < grid[yy].length; xx++) {
      for (let zz = 0; zz < grid[yy][xx].length; zz++) {
        for (let ww = 0; ww < grid[yy][xx][zz].length; ww++) {
          count += grid[yy][xx][zz][ww] === '#' ? 1 : 0;
        }
      }
    }
  }

  return count;
}

function parseInputPartOne(input) {
  const lines = input.split('\n');

  const gridSize = lines.length * 5;
  const grid = new Array(gridSize);
  const offset = Math.floor((gridSize - lines.length) / 2);

  // Create grid
  for (let yy = 0; yy < grid.length; yy++) {
    grid[yy] = new Array(grid.length);

    for (let xx = 0; xx < grid[yy].length; xx++) {
      grid[yy][xx] = new Array(grid.length);

      for (let zz = 0; zz < grid[yy][xx].length; zz++) {
        grid[yy][xx][zz] = '.';
      }
    }
  }

  // Fill grid
  for (let yy = 0; yy < lines.length; yy += 1) {
    for (let xx = 0; xx < lines[yy].length; xx += 1) {
      grid[yy + offset][xx + offset][offset] = lines[yy][xx];
    }
  }

  return grid;
}

function parseInputPartTwo(input) {
  const lines = input.split('\n');

  const gridSize = lines.length * 5;
  const grid = new Array(gridSize);
  const offset = Math.floor((gridSize - lines.length) / 2);

  // Create grid
  for (let yy = 0; yy < grid.length; yy++) {
    grid[yy] = new Array(grid.length);

    for (let xx = 0; xx < grid[yy].length; xx++) {
      grid[yy][xx] = new Array(grid.length);

      for (let zz = 0; zz < grid[yy][xx].length; zz++) {
        grid[yy][xx][zz] = new Array(grid.length);

        for (let ww = 0; ww < grid[yy][xx][zz].length; ww++) {
          grid[yy][xx][zz][ww] = '.';
        }
      }
    }
  }

  // Fill grid
  for (let yy = 0; yy < lines.length; yy += 1) {
    for (let xx = 0; xx < lines[yy].length; xx += 1) {
      for (let zz = 0; zz < lines[yy][zz].length; zz += 1) {
        grid[yy + offset][xx + offset][zz + offset][offset] = lines[yy][xx];
      }
    }
  }

  return grid;
}
