import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-09.txt', 'utf-8');

const isTouching = (x1, y1, x2, y2) => {
  const diffX = Math.abs(x1 - x2);
  const diffY = Math.abs(y1 - y2);

  return diffX <= 1 && diffY <= 1;
};

const calcNewTailCoords = (x1, y1, x2, y2) => {
  const diffX = Math.abs(x1 - x2);
  const diffY = Math.abs(y1 - y2);

  // Horizontal movement
  if (diffX === 2 && diffY === 0) {
    if (x1 < x2) return { x: x2 - 1, y: y2 };
    if (x1 > x2) return { x: x2 + 1, y: y2 };
  }

  // Vertical movement
  if (diffX === 0 && diffY === 2) {
    if (y1 < y2) return { x: x2, y: y2 - 1 };
    if (y1 > y2) return { x: x2, y: y2 + 1 };
  }

  // Diagonal movement - top right
  if (x1 > x2 && y1 < y2) {
    return { x: x2 + 1, y: y2 - 1 };
  }

  // Diagonal movement - top left
  if (x1 < x2 && y1 < y2) {
    return { x: x2 - 1, y: y2 - 1 };
  }

  // Diagonal movement - bottom left
  if (x1 < x2 && y1 > y2) {
    return { x: x2 - 1, y: y2 + 1 };
  }

  // Diagonal movement - bottom right
  if (x1 > x2 && y1 > y2) {
    return { x: x2 + 1, y: y2 + 1 };
  }
};

function partOne(instructions) {
  let headX = 0,
    headY = 0,
    tailX = 0,
    tailY = 0;

  const visitedLocations = new Set();
  visitedLocations.add(`${tailX},${tailY}`);

  for (let { dir, amount } of instructions) {
    for (let ii = 1; ii <= amount; ii += 1) {
      if (dir === 'R') {
        headX += 1;
      } else if (dir === 'U') {
        headY -= 1;
      } else if (dir === 'L') {
        headX -= 1;
      } else if (dir === 'D') {
        headY += 1;
      }

      if (!isTouching(headX, headY, tailX, tailY)) {
        const { x, y } = calcNewTailCoords(headX, headY, tailX, tailY);
        tailX = x;
        tailY = y;

        visitedLocations.add(`${tailX},${tailY}`);
      }
    }
  }

  return visitedLocations.size;
}

function partTwo(instructions) {
  const knots = new Array(10).fill().map(() => ({ x: 0, y: 0}));
  const head = knots.at(0);
  const tail = knots.at(-1);

  const visitedLocations = new Set();
  visitedLocations.add(`${tail.x},${tail.y}`);

  for (let { dir, amount } of instructions) {
    for (let ii = 1; ii <= amount; ii += 1) {
      if (dir === 'R') {
        head.x += 1;
      } else if (dir === 'U') {
        head.y -= 1;
      } else if (dir === 'L') {
        head.x -= 1;
      } else if (dir === 'D') {
        head.y += 1;
      }

      for (let knotIdx = 1; knotIdx < knots.length; knotIdx += 1) {
        const prevKnot = knots[knotIdx - 1];
        const knot = knots[knotIdx];

        if (!isTouching(prevKnot.x, prevKnot.y, knot.x, knot.y)) {
          const { x, y } = calcNewTailCoords(prevKnot.x, prevKnot.y, knot.x, knot.y);
          knot.x = x;
          knot.y = y;

          // Update tail (that is, the last knot)
          if (knotIdx === knots.length - 1) {
            visitedLocations.add(`${tail.x},${tail.y}`);
          }
        }
      }
    }
  }

  return visitedLocations.size;
}

const instructions = input
    .split('\n')
    .map((line) => line.split(' '))
    .map(([dir, amt]) => ({ dir, amount: +amt }));

console.log(partOne(instructions));
console.log(partTwo(instructions));
