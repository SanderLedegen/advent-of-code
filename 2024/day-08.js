import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-08.txt', 'utf-8');

const withinBounds = (x, y, mapSize) => x >= 0 && x < mapSize && y >= 0 && y < mapSize;
const findAntinodes = (startX, startY, diffX, diffY, mapSize) => {
  const antinodes = [];

  let x = startX + diffX;
  let y = startY + diffY;

  while (withinBounds(x, y, mapSize)) {
    antinodes.push({ x, y });
    x += diffX;
    y += diffY;
  }

  x = startX - diffX;
  y = startY - diffY;

  while (withinBounds(x, y, mapSize)) {
    antinodes.push({ x, y });
    x -= diffX;
    y -= diffY;
  }

  return antinodes;
};

function partOne(antennas, mapSize) {
  const antinodeLocations = new Set();

  for (const antennaLocs of antennas.values()) {
    for (let ii = 0; ii < antennaLocs.length; ii++) {
      for (let jj = ii + 1; jj < antennaLocs.length; jj++) {
        const diffX = antennaLocs[jj].x - antennaLocs[ii].x;
        const diffY = antennaLocs[jj].y - antennaLocs[ii].y;

        const newX1 = antennaLocs[ii].x - diffX;
        const newY1 = antennaLocs[ii].y - diffY;
        const newX2 = antennaLocs[jj].x + diffX;
        const newY2 = antennaLocs[jj].y + diffY;

        if (withinBounds(newX1, newY1, mapSize)) {
          antinodeLocations.add(`${newX1},${newY1}`);
        }

        if (withinBounds(newX2, newY2, mapSize)) {
          antinodeLocations.add(`${newX2},${newY2}`);
        }
      }
    }
  }

  return antinodeLocations.size;
}

function partTwo(antennas, mapSize) {
  const antinodeLocations = new Set();

  for (const antennaLocs of antennas.values()) {
    for (let ii = 0; ii < antennaLocs.length; ii++) {
      for (let jj = ii + 1; jj < antennaLocs.length; jj++) {
        const diffX = antennaLocs[jj].x - antennaLocs[ii].x;
        const diffY = antennaLocs[jj].y - antennaLocs[ii].y;

        findAntinodes(antennaLocs[ii].x, antennaLocs[ii].y, diffX, diffY, mapSize).forEach(
          ({ x, y }) => antinodeLocations.add(`${x},${y}`)
        );

        findAntinodes(antennaLocs[jj].x, antennaLocs[jj].y, diffX, diffY, mapSize).forEach(
          ({ x, y }) => antinodeLocations.add(`${x},${y}`)
        );
      }
    }
  }

  return antinodeLocations.size;
}

const map = input.split('\n').map((row) => row.split(''));
const antennas = new Map();

for (let yy = 0; yy < map.length; yy++) {
  for (let xx = 0; xx < map[yy].length; xx++) {
    if (map[yy][xx] !== '.') {
      const arr = antennas.get(map[yy][xx]) || [];
      arr.push({ x: xx, y: yy });
      antennas.set(map[yy][xx], arr);
    }
  }
}

console.log(partOne(antennas, map.length));
console.log(partTwo(antennas, map.length));
