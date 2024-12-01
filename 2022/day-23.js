import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-23.txt', 'utf-8');

const calcFreePositions = (elves, y, x) => {
  let sum = 0;

  for (let row = -1; row <= 1; row += 1) {
    for (let col = -1; col <= 1; col += 1) {
      if (row === 0 && col === 0) continue;
      const key = `${y + row},${x + col}`;
      sum += elves.has(key) ? 0 : 1;
    }
  }

  return sum;
};

const simulate = (input, maxRounds = 10) => {
  const elves = [];
  const setElves = new Set();

  input.split('\n').forEach((line, row) =>
    line.split('').forEach((c, col) => {
      if (c === '#') {
        elves.push({ x: col, y: row });
        setElves.add(`${row},${col}`);
      };
    })
  );

  const directions = [
    [
      // N, NW, NE
      { x: 0, y: -1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
    ],
    [
      // S, SW, SE
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: 1, y: 1 },
    ],
    [
      // W, NW, SW
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: -1, y: 1 },
    ],
    [
      // E, NE, SE
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
    ],
  ];

  let round = 1;

  while (round <= maxRounds) {
    // First half
    const proposals = new Map();
    let noOneMoved = true;

    for (let elfIdx = 0; elfIdx < elves.length; elfIdx += 1) {
      const elf = elves[elfIdx];
      const numFreePos = calcFreePositions(setElves, elf.y, elf.x);

      if (numFreePos < 8) {
        for (let dir of directions) {
          const [a, b, c] = dir;
          const aKey = `${elf.y + a.y},${elf.x + a.x}`;
          const bKey = `${elf.y + b.y},${elf.x + b.x}`;
          const cKey = `${elf.y + c.y},${elf.x + c.x}`;

          // If no one is located in the three directions around the elf itself
          if (!setElves.has(aKey) && !setElves.has(bKey) && !setElves.has(cKey)) {
            const proposalKey = `${elf.y + a.y},${elf.x + a.x}`;
            const val = proposals.get(proposalKey) || [];
            val.push(elfIdx);
            proposals.set(proposalKey, val);
            noOneMoved = false;
            break;
          }
        }
      }
    }

    // Second half
    for (let [coord, elfIndices] of proposals.entries()) {
      if (elfIndices.length > 1) continue;

      const [y, x] = coord.split(',').map(Number);
      const elf = elves[elfIndices.at(0)];
      elf.x = x;
      elf.y = y;
    }

    const firstDir = directions.shift();
    directions.push(firstDir);

    setElves.clear();
    for (let elf of elves) {
      const key = `${elf.y},${elf.x}`;
      setElves.add(key);
    }

    if (noOneMoved) {
      break;
    }

    round += 1;
  }

  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

  for (let elf of elves) {
    const { x, y } = elf;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  const numEmptyTiles = (maxX - minX + 1) * (maxY - minY + 1) - elves.length;

  return {
    numEmptyTiles,
    round,
  };
};

function partOne(input) {
  return simulate(input).numEmptyTiles;
}

function partTwo(input) {
  return simulate(input, Infinity).round;
}

console.log(partOne(input));
console.log(partTwo(input));
