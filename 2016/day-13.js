const input = 1358;

console.log(partOne(input, { x: 31, y: 39 }));
console.log(partTwo(input, 50));

function partOne(input, destination) {
  const gridSize = 50;
  const grid = createGrid(gridSize, input);

  // BFS
  const start = { x: 1, y: 1, path: [] };
  const bfsGrid = new Array(gridSize)
    .fill(0)
    .map(() => new Array(gridSize).fill(0));
  let foundPath;

  const queue = [start];

  while (queue.length > 0) {
    const n = queue.shift();
    bfsGrid[n.y][n.x] = true;

    if (n.x === destination.x && n.y === destination.y) {
      foundPath = n.path;
      break;
    }

    if (n.x - 1 >= 0 && !bfsGrid[n.y][n.x - 1] && grid[n.y][n.x - 1] === '.') {
      queue.push({
        x: n.x - 1,
        y: n.y,
        path: [...n.path, { x: n.x - 1, y: n.y }],
      });
    }

    if (
      n.x + 1 < gridSize &&
      !bfsGrid[n.y][n.x + 1] &&
      grid[n.y][n.x + 1] === '.'
    ) {
      queue.push({
        x: n.x + 1,
        y: n.y,
        path: [...n.path, { x: n.x + 1, y: n.y }],
      });
    }

    if (n.y - 1 >= 0 && !bfsGrid[n.y - 1][n.x] && grid[n.y - 1][n.x] === '.') {
      queue.push({
        x: n.x,
        y: n.y - 1,
        path: [...n.path, { x: n.x, y: n.y - 1 }],
      });
    }

    if (
      n.y + 1 < gridSize &&
      !bfsGrid[n.y + 1][n.x] &&
      grid[n.y + 1][n.x] === '.'
    ) {
      queue.push({
        x: n.x,
        y: n.y + 1,
        path: [...n.path, { x: n.x, y: n.y + 1 }],
      });
    }
  }

  return foundPath?.length;
}

function partTwo(input, maxPathLength) {
  const gridSize = 50;
  const grid = createGrid(gridSize, input);

  // BFS
  const start = { x: 1, y: 1, path: [] };
  const bfsGrid = new Array(gridSize)
    .fill(0)
    .map(() => new Array(gridSize).fill(0));

  const queue = [start];

  while (queue.length > 0) {
    const n = queue.shift();
    bfsGrid[n.y][n.x] = true;

    if (n.path.length === maxPathLength) {
      continue;
    }

    if (n.x - 1 >= 0 && !bfsGrid[n.y][n.x - 1] && grid[n.y][n.x - 1] === '.') {
      queue.push({
        x: n.x - 1,
        y: n.y,
        path: [...n.path, { x: n.x - 1, y: n.y }],
      });
    }

    if (
      n.x + 1 < gridSize &&
      !bfsGrid[n.y][n.x + 1] &&
      grid[n.y][n.x + 1] === '.'
    ) {
      queue.push({
        x: n.x + 1,
        y: n.y,
        path: [...n.path, { x: n.x + 1, y: n.y }],
      });
    }

    if (n.y - 1 >= 0 && !bfsGrid[n.y - 1][n.x] && grid[n.y - 1][n.x] === '.') {
      queue.push({
        x: n.x,
        y: n.y - 1,
        path: [...n.path, { x: n.x, y: n.y - 1 }],
      });
    }

    if (
      n.y + 1 < gridSize &&
      !bfsGrid[n.y + 1][n.x] &&
      grid[n.y + 1][n.x] === '.'
    ) {
      queue.push({
        x: n.x,
        y: n.y + 1,
        path: [...n.path, { x: n.x, y: n.y + 1 }],
      });
    }
  }

  return bfsGrid.reduce((sum, row) => sum + row.filter(r => r).length, 0);
}

function createGrid(gridSize, number) {
  const grid = new Array(gridSize)
    .fill(0)
    .map(() => new Array(gridSize).fill(0));

  for (let yy = 0; yy < gridSize; yy += 1) {
    for (let xx = 0; xx < gridSize; xx += 1) {
      grid[yy][xx] = calculateTile(xx, yy, number);
    }
  }

  return grid;
}

function calculateTile(x, y, number) {
  let value = x * x + 3 * x + 2 * x * y + y + y * y;
  value += number;
  const sum = value
    .toString(2)
    .split('')
    .map(Number)
    .reduce((sum, val) => (sum += val), 0);
  return sum % 2 === 0 ? '.' : '#';
}

function displayGrid(grid) {
  console.log(grid.map((l) => l.join('')).join('\n'));
}
