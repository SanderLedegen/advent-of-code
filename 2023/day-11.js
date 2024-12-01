import { readFileSync } from 'fs';

const input = readFileSync('2023/inputs/day-11.txt', 'utf-8');

const dist = ([x1, y1], [x2, y2]) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

const expandGalaxiesBy = (galaxies, times) => {  
  // Expand rows
  for (let ii = 0; ii < galaxies.length - 1; ii += 1) {
    const diff = galaxies[ii + 1][0] - galaxies[ii][0];
    if (diff > 1) {
      for (let jj = ii + 1; jj < galaxies.length; jj += 1) {
        galaxies[jj][0] += (diff - 1) * (times - 1);
      }
    }
  }

  // Expand cols
  galaxies = galaxies.toSorted((a, b) => a[1] - b[1]);
  for (let ii = 0; ii < galaxies.length - 1; ii += 1) {
    const diff = galaxies[ii + 1][1] - galaxies[ii][1];
    if (diff > 1) {
      for (let jj = ii + 1; jj < galaxies.length; jj += 1) {
        galaxies[jj][1] += (diff - 1) * (times - 1);
      }
    }
  }

  return galaxies;
};

function partOne(galaxies) {
  const copy = JSON.parse(JSON.stringify(galaxies));
  const expandedGalaxies = expandGalaxiesBy(copy, 2);
  let sum = 0;

  for (let ii = 0; ii < expandedGalaxies.length; ii += 1) {
    for (let jj = ii + 1; jj < expandedGalaxies.length; jj += 1) {
      sum += dist(expandedGalaxies[ii], expandedGalaxies[jj]);
    }
  }

  return sum;
}

function partTwo(galaxies) {
  const copy = JSON.parse(JSON.stringify(galaxies));
  const expandedGalaxies = expandGalaxiesBy(copy, 1_000_000);
  let sum = 0;

  for (let ii = 0; ii < expandedGalaxies.length; ii += 1) {
    for (let jj = ii + 1; jj < expandedGalaxies.length; jj += 1) {
      sum += dist(expandedGalaxies[ii], expandedGalaxies[jj]);
    }
  }

  return sum;
}

function parseInput(input) {
  const lines = input.split('\n');
  let galaxies = [];

  for (let yy = 0; yy < lines.length; yy += 1) {
    for (let xx = 0; xx < lines[yy].length; xx += 1) {
      if (lines[yy][xx] === '#') {
        galaxies.push([yy, xx]);
      }
    }
  }

  return galaxies;
}

const galaxies = parseInput(input);

console.log(partOne(galaxies));
console.log(partTwo(galaxies));
