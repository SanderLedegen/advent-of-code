import { readFileSync } from 'fs';

const input = readFileSync('2023/inputs/day-16.txt', 'utf-8');

function partOne(grid, dimension, start) {
  const getHistoryKey = (beam) => {
    return `${beam.y},${beam.x},${beam.dirX},${beam.dirY}`;
  };

  const getLocationKey = (y, x) => {
    return `${y},${x}`;
  };

  const beams = [start];
  const energizedTiles = new Set();
  const history = new Set();

  while (beams.some((beam) => !beam.done)) {
    for (let beam of beams) {
      if (beam.x < 0 || beam.x >= dimension) beam.done = true;
      if (beam.y < 0 || beam.y >= dimension) beam.done = true;
      if (beam.done) continue;

      const historyKey = getHistoryKey(beam);

      // If the beam already travelled in this dir on this location, skip.
      if (history.has(historyKey)) {
        beam.done = true;
        continue;
      }

      history.add(getHistoryKey(beam));

      const locationKey = getLocationKey(beam.y, beam.x);
      energizedTiles.add(locationKey);

      // Beam movement
      switch (grid.get(locationKey)) {
        case undefined:
          beam.x += beam.dirX;
          beam.y += beam.dirY;
          break;

        case '-':
          if (beam.dirX === 0) {
            beam.x -= 1;
            beam.dirX = -1;
            beam.dirY = 0;

            beams.push({
              x: beam.x + 2,
              y: beam.y,
              dirX: 1,
              dirY: 0,
              done: false,
            });
          } else if (beam.dirY === 0) {
            beam.x += beam.dirX;
          }
          break;

        case '|':
          if (beam.dirX === 0) {
            beam.y += beam.dirY;
          } else if (beam.dirY === 0) {
            beam.y -= 1;
            beam.dirX = 0;
            beam.dirY = -1;

            beams.push({
              x: beam.x,
              y: beam.y + 2,
              dirX: 0,
              dirY: 1,
              done: false,
            });
          }
          break;

        case '/':
          if (beam.dirX === -1) {
            beam.y += 1;
            beam.dirX = 0;
            beam.dirY = 1;
          } else if (beam.dirX === 1) {
            beam.y -= 1;
            beam.dirX = 0;
            beam.dirY = -1;
          } else if (beam.dirY === -1) {
            beam.x += 1;
            beam.dirX = 1;
            beam.dirY = 0;
          } else if (beam.dirY === 1) {
            beam.x -= 1;
            beam.dirX = -1;
            beam.dirY = 0;
          }
          break;

        case '\\':
          if (beam.dirX === -1) {
            beam.y -= 1;
            beam.dirX = 0;
            beam.dirY = -1;
          } else if (beam.dirX === 1) {
            beam.y += 1;
            beam.dirX = 0;
            beam.dirY = 1;
          } else if (beam.dirY === -1) {
            beam.x -= 1;
            beam.dirX = -1;
            beam.dirY = 0;
          } else if (beam.dirY === 1) {
            beam.x += 1;
            beam.dirX = 1;
            beam.dirY = 0;
          }
          break;

        default:
          throw `Unknown tile (${grid.get(locationKey)}) at ${locationKey}`;
      }
    }
  }

  return energizedTiles.size;
}

function partTwo(grid, dimension) {
  let max = -Infinity;

  for (let ii = 0; ii < dimension; ii += 1) {
    let beam = {
      x: 0,
      y: ii,
      dirX: 1,
      dirY: 0,
      done: false,
    };

    let num = partOne(grid, dimension, beam);
    max = Math.max(num, max);

    beam = {
      x: dimension - 1,
      y: ii,
      dirX: -1,
      dirY: 0,
      done: false,
    };

    num = partOne(grid, dimension, beam);
    max = Math.max(num, max);
  }

  for (let ii = 0; ii < dimension; ii += 1) {
    let beam = {
      x: ii,
      y: 0,
      dirX: 0,
      dirY: 1,
      done: false,
    };

    let num = partOne(grid, dimension, beam);
    max = Math.max(num, max);

    beam = {
      x: ii,
      y: dimension - 1,
      dirX: 0,
      dirY: -1,
      done: false,
    };

    num = partOne(grid, dimension, beam);
    max = Math.max(num, max);
  }

  return max;
}

function parseInput(input) {
  const map = new Map();
  const lines = input.split('\n');

  for (let yy = 0; yy < lines.length; yy += 1) {
    const line = lines[yy];
    for (let xx = 0; xx < line.length; xx += 1) {
      const char = lines[yy][xx];

      switch (char) {
        case '-':
        case '|':
        case '/':
        case '\\':
          map.set(`${yy},${xx}`, char);
          break;
      }
    }
  }

  return { grid: map, dimension: lines.length };
}

const { grid, dimension } = parseInput(input);
const startBeam = {
  x: 0,
  y: 0,
  dirX: 1,
  dirY: 0,
  done: false,
};

console.log(partOne(grid, dimension, startBeam));
console.log(partTwo(grid, dimension));
