import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-22.txt', 'utf-8');

const isNumber = (value) => /^\d+$/.test(value);

const calcFacingValue = ({ x, y }) => {
  if (x === 1 && y === 0) return 0;
  if (x === 0 && y === 1) return 1;
  if (x === -1 && y === 0) return 2;
  if (x === 0 && y === -1) return 3;

  throw new Error(`Could not calculate facing, unexpected values for x (${x}) and y (${y})`);
};

const parseInput = (input) => {
  const lines = input.split('\n');
  const maxWidth = lines.slice(0, -2).reduce((max, line) => Math.max(max, line.length), 0);
  let startX, startY;

  const path = lines
    .at(-1)
    .match(/(\d+)|(L|R)/g)
    .map((val) => (isNaN(val) ? val : +val));
  const grid = new Array(lines.length - 2).fill().map(() => new Array(maxWidth));

  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      grid[y][x] = [' ', undefined].includes(lines[y][x]) ? undefined : lines[y][x];
      if (startX === undefined && grid[y][x] !== undefined) {
        startX = x;
        startY = y;
      }
    }
  }

  return { grid, path, startX, startY };
};

function partOne(input) {
  const { grid, path, startX, startY } = parseInput(input);
  let x = startX;
  let y = startY;
  let dir = { x: 1, y: 0 }; // Facing right

  for (let value of path) {
    if (value === 'L') {
      dir = { x: dir.y, y: -dir.x === -0 ? 0 : -dir.x };
    } else if (value === 'R') {
      dir = { x: -dir.y === -0 ? 0 : -dir.y, y: dir.x };
    } else if (isNumber(value)) {
      let enableLoop = true;

      for (let ii = 1; enableLoop && ii <= value; ii += 1) {
        const nextTile = grid[y + dir.y]?.[x + dir.x];

        switch (nextTile) {
          case '.': // Open tile
            x += dir.x;
            y += dir.y;
            break;

          case '#': // Solid wall
            enableLoop = false;
            break;

          case undefined: // Wrap around
            const revDirX = -dir.x;
            const revDirY = -dir.y;
            let stepsX = revDirX;
            let stepsY = revDirY;

            while (true) {
              if (grid[y + stepsY]?.[x + stepsX] === undefined) {
                if (grid[y + stepsY + dir.y][x + stepsX + dir.x] === '#') {
                  // Don't wrap around in a wall
                  stepsX = 0;
                  stepsY = 0;
                } else {
                  stepsX += dir.x;
                  stepsY += dir.y;
                }
                break;
              }

              stepsX += revDirX;
              stepsY += revDirY;
            }

            x += stepsX;
            y += stepsY;
            break;

          default:
            throw new Error(`Unexpected value in grid at ${y + dir.y},${x + dir.x}: ${nextTile}`);
        }
      }
    } else {
      throw new Error(`Unexpected value in path: ${value}`);
    }
  }

  let sum = 1000 * (y + 1) + 4 * (x + 1) + calcFacingValue(dir);

  return sum;
}

function partTwo(input) {
  // Cube's faces
  //        ┌──────┬──────┐
  //        │   2  │   3  │
  //        │      │      │
  //        ├──────┼──────┘
  //        │   5  │
  //        │      │
  // ┌──────┼──────┤
  // │   7  │   8  │
  // │      │      │
  // ├──────┼──────┘
  // │  10  │
  // │      │
  // └──────┘

  const moveAroundCube = (dir, x, y) => {
    // Given a face and direction, retrieve new (hardcoded) direction and coords.
    const navMap = {
      2: {
        '-1,0': { dir: { x: 1, y: 0 }, x: 0, y: 149 - y },
        '0,-1': { dir: { x: 1, y: 0 }, x: 0, y: 100 + x },
      },
      3: {
        '1,0': { dir: { x: -1, y: 0 }, x: 99, y: 149 - y },
        '0,-1': { dir: { x: 0, y: -1 }, x: x - 100, y: 199 },
        '0,1': { dir: { x: -1, y: 0 }, x: 99, y: x - 50 },
      },
      5: {
        '-1,0': { dir: { x: 0, y: 1 }, x: y - 50, y: 100 },
        '1,0': { dir: { x: 0, y: -1 }, x: 50 + y, y: 49 },
      },
      7: {
        '-1,0': { dir: { x: 1, y: 0 }, x: 50, y: 149 - y },
        '0,-1': { dir: { x: 1, y: 0 }, x: 50, y: 50 + x },
      },
      8: {
        '1,0': { dir: { x: -1, y: 0 }, x: 149, y: 149 - y },
        '0,1': { dir: { x: -1, y: 0 }, x: 49, y: 100 + x },
      },
      10: {
        '-1,0': { dir: { x: 0, y: 1 }, x: y - 100, y: 0 },
        '0,1': { dir: { x: 0, y: 1 }, x: 100 + x, y: 0 },
        '1,0': { dir: { x: 0, y: -1 }, x: y - 100, y: 149 },
      },
    };
    const currFace = Math.floor(y / 50) * 3 + Math.floor(x / 50) + 1;
    const res = navMap[currFace][`${dir.x},${dir.y}`];

    if (!res) {
      throw new Error(
        `For the given direction (${dir}) and x/y coords (${x},${y}), no new direction and coords were found!`
      );
    }

    return res;
  };

  const { grid, path, startX, startY } = parseInput(input);
  let x = startX;
  let y = startY;
  let dir = { x: 1, y: 0 }; // Facing right

  for (let value of path) {
    if (value === 'L') {
      dir = { x: dir.y, y: -dir.x === -0 ? 0 : -dir.x };
    } else if (value === 'R') {
      dir = { x: -dir.y === -0 ? 0 : -dir.y, y: dir.x };
    } else if (isNumber(value)) {
      let enableLoop = true;

      for (let ii = 1; enableLoop && ii <= value; ii += 1) {
        const nextTile = grid[y + dir.y]?.[x + dir.x];

        switch (nextTile) {
          case '.': // Open tile
            x += dir.x;
            y += dir.y;
            break;

          case '#': // Solid wall
            enableLoop = false;
            break;

          case undefined: // Move to another cube face...
            const res = moveAroundCube(dir, x, y);

            if (!grid[res.y] || grid[res.y][res.x] === undefined) {
              throw new Error(`Moving from one face to another should end in an open tile or wall`);
            }

            if (grid[res.y][res.x] === '.') {
              // ...and keep going...
              x = res.x;
              y = res.y;
              dir = { x: res.dir.x, y: res.dir.y };
            } else if (grid[res.y][res.x] === '#') {
              // ...unless it's a wall!
              enableLoop = false;
            }
            break;

          default:
            throw new Error(`Unexpected value in grid at ${y + dir.y},${x + dir.x}: ${nextTile}`);
        }
      }
    } else {
      throw new Error(`Unexpected value in path: ${value}`);
    }
  }

  let sum = 1000 * (y + 1) + 4 * (x + 1) + calcFacingValue(dir);

  return sum;
}

console.log(partOne(input));
console.log(partTwo(input));
