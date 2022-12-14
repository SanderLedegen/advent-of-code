import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-14.txt', 'utf-8');

function partOne({ grid, minX }) {
  const sandSource = { x: 500 - minX, y: 0 };
  let unitsOfSand = 0;
  let flowIntoAbyss = false;

  while (!flowIntoAbyss) {
    let sandAtRest = false;

    let newSandX = sandSource.x;
    let newSandY = sandSource.y;

    while (!sandAtRest) {
      if (grid[newSandY + 1] === undefined) {
        flowIntoAbyss = true;
        break;
      }

      if (grid[newSandY + 1][newSandX] === undefined) {
        newSandY += 1;
      } else if (grid[newSandY + 1][newSandX - 1] === undefined) {
        newSandY += 1;
        newSandX -= 1;
      } else if (grid[newSandY + 1][newSandX + 1] === undefined) {
        newSandY += 1;
        newSandX += 1;
      } else {
        sandAtRest = true;
      }
    }

    if (!flowIntoAbyss) {
      grid[newSandY][newSandX] = 'o';
      unitsOfSand += 1;
    }
  }

  return unitsOfSand;
}

function partTwo({ grid, minX }) {
  const sandSource = { x: 500 - minX, y: 0 };
  let unitsOfSand = 0;
  let sandSourceBlocked = false;

  while (!sandSourceBlocked) {
    let sandAtRest = false;

    let newSandX = sandSource.x;
    let newSandY = sandSource.y;

    while (!sandAtRest) {
      if (grid[sandSource.y][sandSource.x] === 'o') {
        sandSourceBlocked = true;
        break;
      }

      if (grid[newSandY + 1][newSandX] === undefined) {
        newSandY += 1;
      } else if (grid[newSandY + 1][newSandX - 1] === undefined) {
        newSandY += 1;
        newSandX -= 1;
      } else if (grid[newSandY + 1][newSandX + 1] === undefined) {
        newSandY += 1;
        newSandX += 1;
      } else {
        sandAtRest = true;
      }
    }

    if (!sandSourceBlocked) {
      grid[newSandY][newSandX] = 'o';
      unitsOfSand += 1;
    }
  }
  
  return unitsOfSand;
}

function parseInput(input, isPartTwo = false) {
  const lines = input.split('\n');

  // Determining grid size
  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  for (let ii = 0; ii < lines.length; ii += 1) {
    const line = lines[ii];
    const coords = line.split(' -> ');
    for (let coord of coords) {
      const [x, y] = coord.split(',').map(Number);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (isPartTwo) {
    maxY += 2;
    minX -= 150; // Magic number, increase if error 🤡
    maxX += 150; // Magic number, increase if error 🤡
  }

  const diffX = maxX - minX;
  const diffY = maxY - 0;
  const grid = new Array(diffY + 1).fill().map(() => new Array(diffX + 1));

  // Handle contents of grid
  for (let ii = 0; ii < lines.length; ii += 1) {
    const line = lines[ii];
    const coords = line.split(' -> ');

    for (let coordIdx = 0; coordIdx < coords.length - 1; coordIdx += 1) {
      let [currX, currY] = coords[coordIdx].split(',').map(Number);
      let [nextX, nextY] = coords[coordIdx + 1].split(',').map(Number);

      if (Math.sign(nextX - currX) < 0) {
        [currX, nextX] = [nextX, currX];
      }

      if (Math.sign(nextY - currY) < 0) {
        [currY, nextY] = [nextY, currY];
      }

      for (let x = currX; x <= nextX; x += 1) {
        for (let y = currY; y <= nextY; y += 1) {
          grid[y][x - minX] = '#';
        }
      }
    }
  }

  if (isPartTwo) {
    // Add floor
    for (let x = 0; x <= diffX; x += 1) {
      grid[maxY][x] = '#';
    }
  }

  return {
    grid,
    minX,
  };
}

function output(grid) {
  for (let row = 0; row < grid.length; row += 1) {
    let line = '';

    for (let col = 0; col < grid[row].length; col += 1) {
      const char = grid[row][col] === undefined ? '.' : grid[row][col];
      line += char;
    }

    console.log(line);
  }
}

console.log(partOne(parseInput(input)));
console.log(partTwo(parseInput(input, true)));
