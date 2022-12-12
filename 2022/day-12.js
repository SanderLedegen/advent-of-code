import { readFileSync } from 'fs';
import assert from 'node:assert/strict';

const input = readFileSync('2022/inputs/day-12.txt', 'utf-8');

function partOne(grid, start, target) {
  const getNeighbors = (grid, x, y) => {
    const neighbors = [];
    const currentValue = String.fromCharCode(grid[y][x].charCodeAt(0) + 1);
  
    if (x > 0 && grid[y][x - 1] <= currentValue) {
      neighbors.push({ x: x - 1, y });
    }
  
    if (x < grid[y].length - 1 && grid[y][x + 1] <= currentValue) {
      neighbors.push({ x: x + 1, y });
    }
  
    if (y > 0 && grid[y - 1][x] <= currentValue) {
      neighbors.push({ x, y: y - 1 });
    }
  
    if (y < grid.length - 1 && grid[y + 1][x] <= currentValue) {
      neighbors.push({ x, y: y + 1 });
    }
  
    return neighbors;
  };

  const distances = new Array(grid.length)
    .fill()
    .map((_, idx) => new Array(grid[idx].length).fill(Infinity));
  const queue = [start];
  let targetNode;

  while (queue.length) {
    const node = queue.shift();
    const { x, y, distance } = node;

    if (distances[y][x] <= distance) {
      continue;
    }

    distances[y][x] = distance;

    if (x === target.x && y === target.y) {
      targetNode = node;
      break;
    }

    const neighbors = getNeighbors(grid, x, y);
    neighbors.forEach((n) => {
      if (distances[n.y][n.x] > distance + 1) {
        queue.push({ x: n.x, y: n.y, distance: distance + 1 });
      }
    });
  }

  assert(targetNode, 'No path found!');

  return targetNode.distance;
}

function partTwo(grid, start) {
  const getNeighbors = (grid, x, y) => {
    const neighbors = [];
  
    if (x > 0 && String.fromCharCode(grid[y][x - 1].charCodeAt(0) + 1) >= grid[y][x]) {
      neighbors.push({ x: x - 1, y });
    }
  
    if (x < grid[y].length - 1 && String.fromCharCode(grid[y][x + 1].charCodeAt(0) + 1) >= grid[y][x]) {
      neighbors.push({ x: x + 1, y });
    }
  
    if (y > 0 && String.fromCharCode(grid[y - 1][x].charCodeAt(0) + 1) >= grid[y][x]) {
      neighbors.push({ x, y: y - 1 });
    }
  
    if (y < grid.length - 1 && String.fromCharCode(grid[y + 1][x].charCodeAt(0) + 1) >= grid[y][x]) {
      neighbors.push({ x, y: y + 1 });
    }
  
    return neighbors;
  };

  const distances = new Array(grid.length)
    .fill()
    .map((_, idx) => new Array(grid[idx].length).fill(Infinity));
  const queue = [start];
  let targetNode;

  while (queue.length) {
    const node = queue.shift();
    const { x, y, distance } = node;

    if (distances[y][x] <= distance) {
      continue;
    }

    distances[y][x] = distance;

    if (grid[y][x] === 'a') {
      targetNode = node;
      break;
    }

    const neighbors = getNeighbors(grid, x, y);
    neighbors.forEach((n) => {
      if (distances[n.y][n.x] > distance + 1) {
        queue.push({ x: n.x, y: n.y, distance: distance + 1 });
      }
    });
  }

  assert(targetNode, 'No path found!');

  return targetNode.distance;
}

// Grid setup
let startX, startY, endX, endY;

const grid = input.split('\n').map((line, idx) => {
  const startIndexOf = line.indexOf('S');

  if (startIndexOf > -1) {
    startY = idx;
    startX = startIndexOf;
  }

  const endIndexOf = line.indexOf('E');

  if (endIndexOf > -1) {
    endY = idx;
    endX = endIndexOf;
  }

  return line.split('');
});

grid[startY][startX] = 'a';
grid[endY][endX] = 'z';

// Part 1
let startNode = { x: startX, y: startY, distance: 0 };
let endNode = { x: endX, y: endY };
console.log(partOne(grid, startNode, endNode));

// Part 2
startNode = { x: endX, y: endY, distance: 0 };
console.log(partTwo(grid, startNode));
