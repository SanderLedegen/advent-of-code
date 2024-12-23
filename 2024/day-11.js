import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-11.txt', 'utf-8');

function step(stones) {
  let length = stones.length;

  for (let stoneIdx = 0; stoneIdx < length; stoneIdx += 1) {
    const val = stones[stoneIdx];
    const len = `${val}`.length;

    if (val === 0) {
      stones[stoneIdx] = 1;
    } else if (len % 2 === 0) {
      const a = Number(`${val}`.slice(0, len / 2));
      const b = Number(`${val}`.slice(len / 2));
      stones.splice(stoneIdx, 1, a, b);
      stoneIdx += 1;
      length += 1;
    } else {
      stones[stoneIdx] *= 2024;
    }
  }

  return stones;
}

function partOne(input) {
  let stones = input.split(' ').map(Number);

  // I knew upfront simply calculating everything would not suffice for part two, but hey...
  for (let blink = 1; blink <= 25; blink += 1) {
    stones = step(stones);
  }

  return stones.length;
}

function partTwo(input) {
  const map = new Map();

  const getMapKey = (result, blinksLeft) => `${result.join(' ')} x ${blinksLeft - 1}`;

  const countLength = (stones, blinksLeft) => {
    if (blinksLeft === 0) return 0;

    let totalLength = 0;

    for (let stoneIdx = 0; stoneIdx < stones.length; stoneIdx += 1) {
      const stone = stones[stoneIdx];

      const result = step([stone]);

      if (blinksLeft - 1 === 0) {
        // End of recursion
        totalLength += result.length;
      } else if (blinksLeft > 1) {
        const mapKey = getMapKey(result, blinksLeft);
        let length;

        if (map.has(mapKey)) {
          length = map.get(mapKey);
        } else {
          length = countLength(result, blinksLeft - 1);
          map.set(mapKey, length);
        }

        totalLength += length;
      }
    }

    return totalLength;
  };

  const stones = input.split(' ').map(Number);
  return countLength(stones, 75);
}

console.log(partOne(input));
console.log(partTwo(input));
