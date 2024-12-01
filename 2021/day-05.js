const fs = require('fs');
const input = fs.readFileSync('./inputs/day-05.txt', 'utf-8');

const coordsObj = input.split('\n').reduce(
  (obj, line) => {
    const [from, to] = line.split(' -> ');

    const coord = {
      x1: +from.split(',')[0],
      y1: +from.split(',')[1],
      x2: +to.split(',')[0],
      y2: +to.split(',')[1],
    };

    obj.coords.push(coord);

    if (Math.max(coord.x1, coord.x2) > obj.maxX) {
      obj.maxX = Math.max(coord.x1, coord.x2);
    }

    if (Math.max(coord.y1, coord.y2) > obj.maxY) {
      obj.maxY = Math.max(coord.y1, coord.y2);
    }

    return obj;
  },
  { coords: [], maxX: -Infinity, maxY: -Infinity }
);

console.log(countOverlaps(coordsObj, true));
console.log(countOverlaps(coordsObj));

function countOverlaps(coordsObj, ignoreDiagLines = false) {
  const grid = Array(coordsObj.maxY + 1)
    .fill(0)
    .map((x) => Array(coordsObj.maxX + 1).fill(0));

  for (const coord of coordsObj.coords) {
    // Vertical line
    if (coord.x1 === coord.x2) {
      for (let y = Math.min(coord.y1, coord.y2); y <= Math.max(coord.y1, coord.y2); y += 1) {
        grid[y][coord.x1] += 1;
      }

      continue;
    }

    // Horizontal line
    if (coord.y1 === coord.y2) {
      for (let x = Math.min(coord.x1, coord.x2); x <= Math.max(coord.x1, coord.x2); x += 1) {
        grid[coord.y1][x] += 1;
      }

      continue;
    }

    if (ignoreDiagLines) {
      continue;
    }

    // Diagonal line
    const m = (coord.y2 - coord.y1) / (coord.x2 - coord.x1);

    if (m > 0) {
      const x = Math.min(coord.x1, coord.x2);
      const y = Math.min(coord.y1, coord.y2);

      for (let ii = 0; ii <= Math.abs(coord.x2 - coord.x1); ii += 1) {
        grid[y + ii][x + ii] += 1;
      }
    } else {
      const x = Math.max(coord.x1, coord.x2);
      const y = Math.min(coord.y1, coord.y2);

      for (let ii = 0; ii <= Math.abs(coord.x2 - coord.x1); ii += 1) {
        grid[y + ii][x - ii] += 1;
      }
    }
  }

  let numPointsWithMinTwoOverlaps = 0;
  for (let row of grid) {
    numPointsWithMinTwoOverlaps += row.reduce((count, val) => (count += val >= 2 ? 1 : 0), 0);
  }

  return numPointsWithMinTwoOverlaps;
}
