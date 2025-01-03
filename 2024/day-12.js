import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-12.txt', 'utf-8');

function calcPerim(region) {
  let perim = 0;

  for (let idx = 0; idx < region.length; idx += 1) {
    const { x, y } = region[idx];

    const hasNeighbourLeft = region.find((r) => r.x === x - 1 && r.y === y);
    const hasNeighbourRight = region.find((r) => r.x === x + 1 && r.y === y);
    const hasNeighbourTop = region.find((r) => r.x === x && r.y === y - 1);
    const hasNeighbourBottom = region.find((r) => r.x === x && r.y === y + 1);

    if (!hasNeighbourLeft) perim += 1;
    if (!hasNeighbourRight) perim += 1;
    if (!hasNeighbourTop) perim += 1;
    if (!hasNeighbourBottom) perim += 1;
  }

  return perim;
}

function calcSides(region) {
  const sortedYRegion = region.toSorted((a, b) => a.y - b.y || a.x - b.x);
  const xMap = new Map();

  for (let yy = sortedYRegion.at(0).y; yy <= sortedYRegion.at(-1).y; yy += 1) {
    const allYPos = sortedYRegion.filter((r) => r.y === yy);

    const leftRightIntervals = [];
    let interval = [];
    for (let xx = 0; xx < allYPos.length; xx += 1) {
      if (xx === 0) interval.push(allYPos[xx].x);

      if (xx === allYPos.length - 1) {
        if (interval[0] !== allYPos[xx].x) interval.push(allYPos[xx].x);
        leftRightIntervals.push(interval);
        continue;
      }

      if (!interval.length) {
        interval.push(allYPos[xx].x);
      }

      if (allYPos[xx].x !== allYPos[xx + 1].x - 1) {
        if (interval[0] !== allYPos[xx].x) interval.push(allYPos[xx].x);
        leftRightIntervals.push(interval);
        interval = [];
      }
    }

    xMap.set(yy, leftRightIntervals);
  }

  const sortedXRegion = region.toSorted((a, b) => a.x - b.x || a.y - b.y);
  const yMap = new Map();

  for (let xx = sortedXRegion.at(0).x; xx <= sortedXRegion.at(-1).x; xx += 1) {
    const allXPos = sortedXRegion.filter((r) => r.x === xx);

    const topBottomIntervals = [];
    let interval = [];
    for (let yy = 0; yy < allXPos.length; yy += 1) {
      if (yy === 0) interval.push(allXPos[yy].y);

      if (yy === allXPos.length - 1) {
        if (interval[0] !== allXPos[yy].y) interval.push(allXPos[yy].y);
        topBottomIntervals.push(interval);
        continue;
      }

      if (!interval.length) {
        interval.push(allXPos[yy].y);
      }

      if (allXPos[yy].y !== allXPos[yy + 1].y - 1) {
        if (interval[0] !== allXPos[yy].y) interval.push(allXPos[yy].y);
        topBottomIntervals.push(interval);
        interval = [];
      }
    }

    yMap.set(xx, topBottomIntervals);
  }

  let sidesRight = [...xMap.values()][0].length;
  let sidesLeft = [...xMap.values()][0].length;

  for (let idx = 1; idx < xMap.size; idx += 1) {
    const intervals = [...xMap.values()][idx];
    for (let [left, right] of intervals) {
      if (right === undefined) right = left;

      const prevIntervals = [...xMap.values()][idx - 1];

      const existingLeftSide = prevIntervals.some((ints) => {
        return ints[0] === left;
      });

      if (!existingLeftSide) {
        sidesLeft += 1;
      }

      const existingRightSide = prevIntervals.some((ints) => {
        return (ints[1] ?? ints[0]) === right;
      });

      if (!existingRightSide) {
        sidesRight += 1;
      }
    }
  }

  let sidesTop = [...yMap.values()][0].length;
  let sidesBottom = [...yMap.values()][0].length;

  for (let idx = 1; idx < yMap.size; idx += 1) {
    const intervals = [...yMap.values()][idx];
    for (let [top, bottom] of intervals) {
      if (bottom === undefined) bottom = top;

      const prevIntervals = [...yMap.values()][idx - 1];

      const existingTopSide = prevIntervals.some((ints) => {
        return ints[0] === top;
      });

      if (!existingTopSide) {
        sidesTop += 1;
      }

      const existingBottomSide = prevIntervals.some((ints) => {
        return (ints[1] ?? ints[0]) === bottom;
      });

      if (!existingBottomSide) {
        sidesBottom += 1;
      }
    }
  }

  return sidesLeft + sidesRight + sidesTop + sidesBottom;
}

function partOne(regions) {
  return regions.reduce((price, region) => {
    const perim = calcPerim(region);
    const area = region.length;
    return price + perim * area;
  }, 0);
}

function partTwo(regions) {
  return regions.reduce((price, region) => {
    const sides = calcSides(region);
    const area = region.length;
    return price + sides * area;
  }, 0);
}

function mapRegion(grid, startX, startY, coordCheckedMap) {
  const stack = [{ x: startX, y: startY }];
  const visited = new Set();
  const region = [];

  while (stack.length) {
    const { x, y } = stack.pop();

    if (visited.has(`${x},${y}`)) continue;

    visited.add(`${x},${y}`);
    region.push({ x, y });
    coordCheckedMap.set(`${x},${y}`);

    if (x > 0 && grid[y][x - 1] === grid[y][x]) stack.push({ x: x - 1, y });
    if (x < grid[y].length - 1 && grid[y][x + 1] === grid[y][x]) stack.push({ x: x + 1, y });
    if (y > 0 && grid[y - 1][x] === grid[y][x]) stack.push({ x, y: y - 1 });
    if (y < grid.length - 1 && grid[y + 1][x] === grid[y][x]) stack.push({ x, y: y + 1 });
  }

  return region;
}

function findAllRegions(grid) {
  const regions = [];
  const coordCheckedMap = new Map();

  for (let yy = 0; yy < grid.length; yy += 1) {
    for (let xx = 0; xx < grid[yy].length; xx += 1) {
      if (coordCheckedMap.has(`${xx},${yy}`)) continue;

      const region = mapRegion(grid, xx, yy, coordCheckedMap);
      regions.push(region);
    }
  }

  return regions;
}

const grid = input.split('\n').map((line) => line.split(''));
const regions = findAllRegions(grid);

console.log(partOne(regions));
console.log(partTwo(regions));
