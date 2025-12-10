import { readFileSync } from 'fs';

const input = readFileSync('2025/inputs/day-07.txt', 'utf-8');

function partOne({ start, splitters, maxHeight }) {
  let beams = new Set();
  beams.add(`${start},1`);
  let numSplits = 0;

  for (let ii = 2; ii < maxHeight; ii += 1) {
    const newBeams = new Set();

    [...beams.values()].forEach((beam) => {
      const [x, y] = beam.split(',').map(Number);
      if (splitters.has(`${x},${y + 1}`)) {
        numSplits += 1;
        newBeams.add(`${x - 1},${y + 1}`);
        newBeams.add(`${x + 1},${y + 1}`);
      } else {
        newBeams.add(`${x},${y + 1}`);
      }
    });

    beams = newBeams;
  }

  return numSplits;
}

function partTwo({ start, splitters, maxHeight }) {
  const cache = new Map();

  const countTimelines = (startRow, beams) => {
    let numTimelines = 0;

    for (let ii = startRow; ii < maxHeight; ii += 1) {
      const newBeams = new Set();

      [...beams.values()].forEach((beam) => {
        const [x, y] = beam.split(',').map(Number);
        if (splitters.has(`${x},${y + 1}`)) {
          numTimelines += 1;

          const leftPathKey = `${ii + 1},${x - 1},${y + 1}`;
          const rightPathKey = `${ii + 1},${x + 1},${y + 1}`;

          if (!cache.has(leftPathKey)) {
            const left = countTimelines(ii + 1, new Set().add(`${x - 1},${y + 1}`));
            cache.set(leftPathKey, left);
          }
          numTimelines += cache.get(leftPathKey);

          if (!cache.has(rightPathKey)) {
            const right = countTimelines(ii + 1, new Set().add(`${x + 1},${y + 1}`));
            cache.set(rightPathKey, right);
          }
          numTimelines += cache.get(rightPathKey);

          return numTimelines;
        } else {
          newBeams.add(`${x},${y + 1}`);
        }
      });

      beams = newBeams;
    }

    return numTimelines;
  };

  let beams = new Set();
  beams.add(`${start},1`);

  return 1 + countTimelines(1, beams);
}

function parseInput(input) {
  const lines = input.split('\n');
  const start = lines[0].indexOf('S');
  const splitters = new Set();

  for (let yy = 2; yy < lines.length; yy += 1) {
    const line = lines[yy];
    for (let xx = 0; xx < lines[yy].length; xx += 1) {
      if (line[xx] === '^') splitters.add(`${xx},${yy}`);
    }
  }

  return {
    start,
    splitters,
    maxHeight: lines.length,
  };
}

const parsedInput = parseInput(input);

console.log(partOne(parsedInput));
console.log(partTwo(parsedInput));
