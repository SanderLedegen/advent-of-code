import { readFileSync } from 'fs';

let input = readFileSync('2022/inputs/day-17.txt', 'utf-8');
const jets = input.split('');

function partOne(jets, maxNumRocks) {
  const roomWidth = 7;
  const maxHeightShape = 4;
  const shapes = [
    { width: 4, height: 1, shape: [[1, 1, 1, 1]] },
    { width: 3, height: 3, shape: [[0, 1, 0],[1, 1, 1],[0, 1, 0]] },
    { width: 3, height: 3, shape: [[0, 0, 1],[0, 0, 1],[1, 1, 1]] },
    { width: 1, height: 4, shape: [[1],[1],[1],[1]] },
    { width: 2, height: 2, shape: [[1, 1],[1, 1]] },
  ];
  const startX = 2;
  const startY = 3;

  const grid = new Array(maxHeightShape * maxNumRocks).fill().map(() => new Array(roomWidth).fill(0));

  let numRocks = 0;
  let jetIdx = 0;
  let height = 0;

  while (numRocks < maxNumRocks) {
    let shape = shapes[numRocks % shapes.length];
    
    let y = grid.length - height - shape.height - startY;
    let x = startX;
    let ableToMove = true;
    
    while (ableToMove) {
      let jetDir = jets[jetIdx % jets.length];

      if (jetDir === '<') {
        if (x > 0 && canMoveLeft(grid, shape, y, x)) {
          x -= 1;
        }
      }

      if (jetDir === '>') {
        if ((x + shape.width) < roomWidth && canMoveRight(grid, shape, y, x)) {
          x += 1;
        }
      }

      if (y + shape.height < grid.length && canMoveDown(grid, shape, y, x)) {
        y += 1;
      } else {
        ableToMove = false;
      }

      jetIdx += 1;
    }

    for (let yy = 0; yy < shape.height; yy += 1) {
      for (let xx = 0; xx < shape.width; xx += 1) {
        grid[y + yy][x + xx] = grid[y + yy][x + xx] || shape.shape[yy][xx];
      }
    }
    
    numRocks += 1;
    height = getHeight(grid);
  }
  
  return height;
}

const canMoveLeft = (grid, shape, y, x) => {
  let canMove = true;

  for (let yy = 0; yy < shape.height && canMove; yy += 1) {
    for (let xx = 0; xx < shape.width; xx += 1) {
      if (shape.shape[yy][xx] === 0) continue;

      if (grid[y + yy][x + xx - 1] === 1) {
        canMove = false;
        break;
      }
    }
  }

  return canMove;
};

const canMoveRight = (grid, shape, y, x) => {
  let canMove = true;

  for (let yy = 0; yy < shape.height && canMove; yy += 1) {
    for (let xx = 0; xx < shape.width; xx += 1) {
      if (shape.shape[yy][xx] === 0) continue;

      if (grid[y + yy][x + xx + 1] === 1) {
        canMove = false;
        break;
      }
    }
  }

  return canMove;
};

const canMoveDown = (grid, shape, y, x) => {
  let canMove = true;

  for (let yy = 0; yy < shape.height && canMove; yy += 1) {
    for (let xx = 0; xx < shape.width; xx += 1) {
      if (shape.shape[yy][xx] === 0) continue;

      if (grid[y + yy + 1][x + xx] === 1) {
        canMove = false;
        break;
      }
    }
  }

  return canMove;
};

const getHeight = (grid) => {
  let height = 0;

  while (true) {
    const hasRock = grid[grid.length - height - 1]?.join('')?.includes('1');

    if (hasRock) {
      height += 1;
    } else {
      return height;
    }
  }
}

function partTwo(jets, maxNumRocks) {
  const roomWidth = 7;
  const maxHeightShape = 4;
  const shapes = [
    { width: 4, height: 1, shape: [[1, 1, 1, 1]] },
    { width: 3, height: 3, shape: [[0, 1, 0],[1, 1, 1],[0, 1, 0]] },
    { width: 3, height: 3, shape: [[0, 0, 1],[0, 0, 1],[1, 1, 1]] },
    { width: 1, height: 4, shape: [[1],[1],[1],[1]] },
    { width: 2, height: 2, shape: [[1, 1],[1, 1]] },
  ];
  const startX = 2;
  const startY = 3;

  const grid = new Array(maxHeightShape * 1000).fill().map(() => new Array(roomWidth).fill(0));

  const cycles = new Map();
  const firstCycle = new Map();

  const hash = (jetIdx, shapeIdx, surface) => {
    return `${jetIdx}-${shapeIdx}-${surface.join('')}`;
  }

  let numRocks = 0;
  let jetIdx = 0;
  let height = 0;

  while (numRocks < maxNumRocks) {
    let shape = shapes[numRocks % shapes.length];
    
    let y = grid.length - height - shape.height - startY;
    let x = startX;
    let ableToMove = true;
    
    while (ableToMove) {
      let jetDir = jets[jetIdx % jets.length];

      if (jetDir === '<') {
        if (x > 0 && canMoveLeft(grid, shape, y, x)) {
          x -= 1;
        }
      }

      if (jetDir === '>') {
        if ((x + shape.width) < roomWidth && canMoveRight(grid, shape, y, x)) {
          x += 1;
        }
      }

      if (y + shape.height < grid.length && canMoveDown(grid, shape, y, x)) {
        y += 1;
      } else {
        ableToMove = false;
      }

      jetIdx += 1;
    }

    for (let yy = 0; yy < shape.height; yy += 1) {
      for (let xx = 0; xx < shape.width; xx += 1) {
        grid[y + yy][x + xx] = grid[y + yy][x + xx] || shape.shape[yy][xx];
      }
    }

    height = getHeight(grid);
    firstCycle.set(numRocks + 1, height);
    
    const hashed = hash(jetIdx % jets.length, numRocks % shapes.length, []);
    if (cycles.has(hashed)) {
      console.log(`Cycle found after ${numRocks} iterations (height ${height}), seen first at ${cycles.get(hashed).numRocks} (height ${cycles.get(hashed).height}).`);

      const shiz = cycles.get(hashed);
      const rocksPerCycle = numRocks - shiz.numRocks;
      const heightPerCycle = height - shiz.height;

      console.log(`Cycle size is ${rocksPerCycle}, height per cycle is ${heightPerCycle}`);

      const completeCycles = Math.floor((maxNumRocks - numRocks) / rocksPerCycle);
      const incomplete = (maxNumRocks - numRocks) % rocksPerCycle;
      const heightGained = completeCycles * heightPerCycle;

      if (incomplete) {
        const incompleteHeight = firstCycle.get(cycles.get(hashed).numRocks + incomplete) - cycles.get(hashed).height;
        return height + heightGained + incompleteHeight;
      } else {
        return height + heightGained;
      }
    } else {
      cycles.set(hashed, {numRocks, height});
    }
    
    numRocks += 1;
  }
}

console.log(partOne(jets, 2022));
console.log(partTwo(jets, 2022)); // 1_000_000_000_000
