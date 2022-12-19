import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-15.txt', 'utf-8');

const manhattanDistance = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

// Could optimise part I, knowing what I know now after part II
function partOne(positions, rowToInspect) {
  const coveredLocations = new Set();
  const beaconsOnRowToInspect = new Set();

  for (let position of positions) {
    const reachable = Math.abs(position.sensorY - rowToInspect) <= position.dist;
    if (!reachable) {
      continue;
    }

    if (position.beaconY === rowToInspect) {
      beaconsOnRowToInspect.add(position.beaconX);
    }

    const remainingDist = position.dist - Math.abs(position.sensorY - rowToInspect);

    coveredLocations.add(position.sensorX);
    for (let ii = 1; ii <= remainingDist; ii += 1) {
      coveredLocations.add(position.sensorX + ii);
      coveredLocations.add(position.sensorX - ii);
    }
  }

  // Don't include beacons when counting
  for (let x of beaconsOnRowToInspect) {
    if (coveredLocations.has(x)) {
      coveredLocations.delete(x);
    }
  }

  return coveredLocations.size;
}

function partTwo(positions, limit) {
  let result = undefined;

  for (let row = 0; row <= limit; row += 1) {
    const ranges = [];
    
    for (let position of positions) {
      const reachable = Math.abs(position.sensorY - row) <= position.dist;
      if (!reachable) {
        continue;
      }
      
      const remainingDist = position.dist - Math.abs(position.sensorY - row);
      
      ranges.push([position.sensorX - remainingDist, position.sensorX + remainingDist]);
    }

    ranges.sort((a, b) => a[0] - b[0]);

    let reqMin = -1;

    for (let ii = 0; ii < ranges.length; ii += 1) {
      const range = ranges[ii];
      if (range[0] > reqMin + 1) {
        result = { x: reqMin + 1, y: row };
      }

      reqMin = Math.max(reqMin, range[1]);
    }
  }

  return result.x * 4_000_000 + result.y;
}

const positions = input.split('\n').map((line) => {
  const [sx, sy, bx, by] = line.match(/\d+/g).map(Number);
  return {
    sensorX: sx,
    sensorY: sy,
    beaconX: bx,
    beaconY: by,
    dist: manhattanDistance(sx, sy, bx, by),
  };
});

console.log(partOne(positions, 2_000_000));
console.log(partTwo(positions, 4_000_000));
