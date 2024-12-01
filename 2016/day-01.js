const fs = require('fs');
const input = fs.readFileSync('./inputs/day-01.txt', 'utf-8');

console.log(partOne(input));

function partOne(input) {
  let x = 0;
  let y = 0;
  let heading = 'N';
  const visitedLocations = new Set();
  let locationThatHasBeenVisitedTwice;

  input
    .split(', ')
    .map((d) => ({ direction: d[0], amount: +d.substring(1) }))
    .forEach((d) => {
      heading = turn(heading, d.direction);
      const result = walk(heading, d.amount, x, y, visitedLocations);

      x = result.x;
      y = result.y;

      result.visitedLocations.forEach((loc) => {
        if (visitedLocations.has(loc)) {
          if (!locationThatHasBeenVisitedTwice) {
            locationThatHasBeenVisitedTwice = loc;
          }
        } else {
          visitedLocations.add(loc);
        }
      });
    });

  let [xx, yy] = locationThatHasBeenVisitedTwice.split(',').map(Number);

  return {
    distance: dist(x, y),
    firstDoubleLocation: locationThatHasBeenVisitedTwice,
    distFirstDoubleLocation: dist(xx, yy),
  };
}

function turn(heading, direction) {
  switch (heading) {
    case 'N':
      return direction === 'L' ? 'W' : 'E';

    case 'E':
      return direction === 'L' ? 'N' : 'S';

    case 'S':
      return direction === 'L' ? 'E' : 'W';

    case 'W':
      return direction === 'L' ? 'S' : 'N';
  }
}

function walk(heading, amount, x, y) {
  const visitedLocations = [];

  switch (heading) {
    case 'N':
      for (let ii = y - 1; ii >= y - amount; ii -= 1) {
        visitedLocations.push(`${x},${ii}`);
      }
      return { x: x, y: y - amount, visitedLocations };

    case 'E':
      for (let ii = x + 1; ii <= x + amount; ii += 1) {
        visitedLocations.push(`${ii},${y}`);
      }
      return { x: x + amount, y: y, visitedLocations };

    case 'S':
      for (let ii = y + 1; ii <= y + amount; ii += 1) {
        visitedLocations.push(`${x},${ii}`);
      }
      return { x: x, y: y + amount, visitedLocations };

    case 'W':
      for (let ii = x - 1; ii >= x - amount; ii -= 1) {
        visitedLocations.push(`${ii},${y}`);
      }
      return { x: x - amount, y: y, visitedLocations };
  }
}

function dist(x, y) {
  return Math.abs(x) + Math.abs(y);
}
