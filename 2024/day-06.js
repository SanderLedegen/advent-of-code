import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-06.txt', 'utf-8');

function parseInput(input) {
  const lines = input.split('\n');
  let x, y;
  const map = [];

  for (let yy = 0; yy < lines.length; yy += 1) {
    const splitted = lines[yy].split('');
    map.push(splitted);
    const xIdx = splitted.findIndex((char) => char === '^');
    if (xIdx > -1) {
      x = xIdx;
      y = yy;
    }
  }

  return { map, x, y };
}

function partOne({ map, x, y }) {
  let dirY = -1;
  let dirX = 0;
  let numMoves = 0;
  let maxNumMoves = map.length * map[0].length;
  const visited = new Set();
  visited.add(`${x},${y}`);

  while (true) {
    if (numMoves >= maxNumMoves) return null;

    x += dirX;
    y += dirY;
    visited.add(`${x},${y}`);
    numMoves += 1;

    if (x + dirX < 0 || x + dirX >= map[y].length || y + dirY < 0 || y + dirY >= map.length) break;

    while (map[y + dirY][x + dirX] === '#') {
      if (dirY === -1 && dirX === 0) {
        dirY = 0;
        dirX = 1;
      } else if (dirY === 0 && dirX === 1) {
        dirY = 1;
        dirX = 0;
      } else if (dirY === 1 && dirX === 0) {
        dirY = 0;
        dirX = -1;
      } else if (dirY === 0 && dirX === -1) {
        dirY = -1;
        dirX = 0;
      }
    }
  }

  return visited;
}

function partTwo({ map, x: startX, y: startY }, visited) {
  let numDiffPositions = 0;

  visited.forEach((xy) => {
    const [x, y] = xy.split(',').map(Number);
    if (x === startX && y === startY) return;

    const copy = map.map((row) => [...row]);
    copy[y][x] = '#';

    const res = partOne({ map: copy, x: startX, y: startY });
    if (res === null) {
      numDiffPositions += 1;
    }
  });

  return numDiffPositions;
}

const parsedInput = parseInput(input);
const visited = partOne(parsedInput);

console.log(visited.size);
console.log(partTwo(parsedInput, visited));
