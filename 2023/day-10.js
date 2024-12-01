import { readFileSync } from 'fs';

let input = readFileSync('2023/inputs/day-10.txt', 'utf-8');

function partOne(maze, start) {
  const findConnectedPipe = (maze, { x, y }, prevCoord) => {
    const canGoWest = x > 0 && ['S', '-', 'L', 'F'].includes(maze[y][x - 1]);
    const connectedToWest = ['S', '-', '7', 'J'].includes(maze[y][x]);
    if (prevCoord.x !== x - 1 && canGoWest && connectedToWest) {
      return { x: x - 1, y };
    }

    const canGoEast = x < maze[y].length - 1 && ['S', '-', 'J', '7'].includes(maze[y][x + 1]);
    const connectedToEast = ['S', '-', 'L', 'F'].includes(maze[y][x]);
    if (prevCoord.x !== x + 1 && canGoEast && connectedToEast) {
      return { x: x + 1, y };
    }

    const canGoNorth = y > 0 && ['S', '|', '7', 'F'].includes(maze[y - 1][x]);
    const connectedToNorth = ['S', '|', 'L', 'J'].includes(maze[y][x]);
    if (prevCoord.y !== y - 1 && canGoNorth && connectedToNorth) {
      return { x, y: y - 1 };
    }

    const canGoSouth = y < maze.length && ['S', '|', 'J', 'L'].includes(maze[y + 1][x]);
    const connectedToSouth = ['S', '|', '7', 'F'].includes(maze[y][x]);
    if (prevCoord.y !== y + 1 && canGoSouth && connectedToSouth) {
      return { x, y: y + 1 };
    }
  };

  let pipeCoord = findConnectedPipe(maze, start, {});
  const loop = [start, pipeCoord];
  let prevCoord = start;

  while (!(pipeCoord.x === start.x && pipeCoord.y === start.y)) {
    pipeCoord = findConnectedPipe(maze, pipeCoord, prevCoord);
    loop.push(pipeCoord);
    prevCoord = loop.at(-2);
  }

  return loop;
}

function partTwo(maze, loop) {
  const set = new Set();

  const getCurrDir = (a, b) => ({ x: b.x - a.x, y: b.y - a.y});
  const lookRight = ({x, y}) => {
    if (x === 1 && y === 0) return {x: 0, y: 1};
    if (x === -1 && y === 0) return {x: 0, y: -1};
    if (x === 0 && y === -1) return {x: 1, y: 0};
    if (x === 0 && y === 1) return {x: -1, y: 0};
  };
  const lookLeft = ({x, y}) => {
    if (x === 1 && y === 0) return {x: 0, y: -1};
    if (x === -1 && y === 0) return {x: 0, y: 1};
    if (x === 0 && y === -1) return {x: -1, y: 0};
    if (x === 0 && y === 1) return {x: 1, y: 0};
  };

  for (let ii = 0; ii < loop.length - 1; ii += 1) {
    const currDir = getCurrDir(loop[ii], loop[ii + 1]);
    const {x, y} = lookLeft(currDir);

    const finalX = x + loop[ii].x;
    const finalY = y + loop[ii].y;

    set.add(`${finalY}|${finalX}`);
  }

  for (let {x, y} of loop) {
    set.delete(`${y}|${x}`);
  }

  for (let entry of set.values()) {
    let [y, x] = entry.split('|').map(Number);
    if (y > -1 && x > -1 && y < maze.length && x < maze[y].length) {
      maze[y][x] = '#'

    }
  }

  printMaze(maze);

  return set.size;
}

function printMaze(maze) {
  for (let yy = 0; yy < maze.length; yy += 1) {
    let line = maze[yy].join('');
    console.log(line)
  }
}

function parseInput(input) {
  const lines = input.split('\n');
  const maze = new Array(lines.length);
  let start = { x: undefined, y: undefined };

  for (let yy = 0; yy < maze.length; yy += 1) {
    maze[yy] = lines[yy].split('');
    const sPos = lines[yy].indexOf('S');
    if (sPos > -1) {
      start.x = sPos;
      start.y = yy;
    }
  }

  return { maze, start };
}

const { maze, start } = parseInput(input);

const loop = partOne(maze, start);
console.log(partTwo(maze, loop));
