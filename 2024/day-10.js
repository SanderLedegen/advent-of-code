import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-10.txt', 'utf-8');

function solve(grid, startLocations, isPartTwo = false) {
  let totalScore = 0;

  for (let startLocIdx = 0; startLocIdx < startLocations.length; startLocIdx++) {
    const startLoc = startLocations[startLocIdx];
    const stack = [startLoc];
    const visited = new Set();
    let score = 0;

    // Classic DFS
    while (stack.length) {
      const { x, y } = stack.pop();

      if (visited.has(`${x},${y}`)) continue;
      visited.add(`${x},${y}`);

      if (grid[y][x] === 9) {
        score += 1;
        if (isPartTwo) visited.clear();
        continue;
      }

      if (x > 0 && grid[y][x - 1] === grid[y][x] + 1) stack.push({ x: x - 1, y });
      if (x < grid[y].length - 1 && grid[y][x + 1] === grid[y][x] + 1) stack.push({ x: x + 1, y });
      if (y > 0 && grid[y - 1][x] === grid[y][x] + 1) stack.push({ x, y: y - 1 });
      if (y < grid.length - 1 && grid[y + 1][x] === grid[y][x] + 1) stack.push({ x, y: y + 1 });
    }

    totalScore += score;
  }

  return totalScore;
}

const startLocations = [];
const grid = input.split('\n').map((row, yy) => {
  const splitted = row.split('').map(Number);
  [...row.matchAll(/0/g)].reduce((arr, match) => {
    startLocations.push({ x: match.index, y: yy });
    return arr;
  }, []);
  return splitted;
});

console.log(solve(grid, startLocations));
console.log(solve(grid, startLocations, true));
