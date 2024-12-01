import { readFileSync } from 'fs';

let input = readFileSync('2023/inputs/day-14.txt', 'utf-8');

const moveNorth = (roundedRocks, rockIdx, cubeRocks) => {
  let [rockY, rockX] = roundedRocks[rockIdx].split(',').map(Number);

  for (let yy = rockY; yy > 0; yy -= 1) {
    if (yy - 1 < 0) break;
    if (cubeRocks.has(`${yy - 1},${rockX}`)) break;
    if (roundedRocks.includes(`${yy - 1},${rockX}`)) break;

    rockY = yy - 1;
  }

  roundedRocks[rockIdx] = `${rockY},${rockX}`;
};

const moveWest = (roundedRocks, rockIdx, cubeRocks) => {
  let [rockY, rockX] = roundedRocks[rockIdx].split(',').map(Number);

  for (let xx = rockX; xx > 0; xx -= 1) {
    if (xx - 1 < 0) break;
    if (cubeRocks.has(`${rockY},${xx - 1}`)) break;
    if (roundedRocks.includes(`${rockY},${xx - 1}`)) break;

    rockX = xx - 1;
  }

  roundedRocks[rockIdx] = `${rockY},${rockX}`;
};

const moveSouth = (roundedRocks, rockIdx, cubeRocks, platformHeight) => {
  let [rockY, rockX] = roundedRocks[rockIdx].split(',').map(Number);

  for (let yy = rockY; yy < platformHeight - 1; yy += 1) {
    if (yy + 1 >= platformHeight) break;
    if (cubeRocks.has(`${yy + 1},${rockX}`)) break;
    if (roundedRocks.includes(`${yy + 1},${rockX}`)) break;

    rockY = yy + 1;
  }

  roundedRocks[rockIdx] = `${rockY},${rockX}`;
};

const moveEast = (roundedRocks, rockIdx, cubeRocks, platformHeight) => {
  let [rockY, rockX] = roundedRocks[rockIdx].split(',').map(Number);

  for (let xx = rockX; xx < platformHeight - 1; xx += 1) {
    if (xx + 1 >= platformHeight) break;
    if (cubeRocks.has(`${rockY},${xx + 1}`)) break;
    if (roundedRocks.includes(`${rockY},${xx + 1}`)) break;

    rockX = xx + 1;
  }

  roundedRocks[rockIdx] = `${rockY},${rockX}`;
};

function partOne(input) {
  const { roundedRocks, cubeRocks, platformHeight } = parseInput(input);

  for (let idx = 0; idx < roundedRocks.length; idx += 1) {
    moveNorth(roundedRocks, idx, cubeRocks);
  }

  return roundedRocks.reduce((sum, rock) => {
    let [rockY] = rock.split(',').map(Number);
    return sum + platformHeight - rockY;
  }, 0);
}

function partTwo(input) {
  let { roundedRocks, cubeRocks, platformHeight } = parseInput(input);
  const set = new Set();

  for (let cycle = 0; cycle < 1000000000; cycle += 1) {
    roundedRocks = roundedRocks.toSorted((a, b) => {
      const [aY, aX] = a.split(',').map(Number);
      const [bY, bX] = b.split(',').map(Number);

      return aY - bY;
    });

    for (let idx = 0; idx < roundedRocks.length; idx += 1) {
      moveNorth(roundedRocks, idx, cubeRocks);
    }

    roundedRocks = roundedRocks.toSorted((a, b) => {
      const [aY, aX] = a.split(',').map(Number);
      const [bY, bX] = b.split(',').map(Number);

      return aX - bX;
    });

    for (let idx = 0; idx < roundedRocks.length; idx += 1) {
      moveWest(roundedRocks, idx, cubeRocks);
    }

    roundedRocks = roundedRocks.toSorted((a, b) => {
      const [aY, aX] = a.split(',').map(Number);
      const [bY, bX] = b.split(',').map(Number);

      return bY - aY;
    });

    for (let idx = 0; idx < roundedRocks.length; idx += 1) {
      moveSouth(roundedRocks, idx, cubeRocks, platformHeight);
    }

    roundedRocks = roundedRocks.toSorted((a, b) => {
      const [aY, aX] = a.split(',').map(Number);
      const [bY, bX] = b.split(',').map(Number);

      return bX - aX;
    });

    for (let idx = 0; idx < roundedRocks.length; idx += 1) {
      moveEast(roundedRocks, idx, cubeRocks, platformHeight);
    }

    const setSize = set.size;
    set.add(roundedRocks.join(' | '));
    if (setSize === set.size) {
      console.log(`Cycle detected...`);
      const setValues = [...set.values()];
      const cycleStartIdx = setValues.findIndex((val) => val === roundedRocks.join(' | '));
      const cycleLength = cycle - cycleStartIdx;
      const correspondingCycleIdx =
        ((1000000000 - 1 - cycleStartIdx) % cycleLength) + cycleStartIdx;
      console.log(
        `Start: ${cycleStartIdx}, length: ${cycleLength}, corresponding index ${correspondingCycleIdx}`
      );

      return setValues[correspondingCycleIdx].split(' | ').reduce((sum, rock) => {
        let [rockY] = rock.split(',').map(Number);
        return sum + platformHeight - rockY;
      }, 0);
    }
  }

  throw 'Here be dragons';
}

function parseInput(input) {
  const lines = input.split('\n');

  return lines.reduce(
    (rocks, line, idx) => {
      for (let ii = 0; ii < line.length; ii += 1) {
        if (line[ii] === 'O') {
          rocks.roundedRocks.push(`${idx},${ii}`);
        }

        if (line[ii] === '#') {
          rocks.cubeRocks.add(`${idx},${ii}`);
        }
      }

      return rocks;
    },
    { roundedRocks: [], cubeRocks: new Set(), platformHeight: lines.length }
  );
}

console.log(partOne(input));
console.log(partTwo(input));
