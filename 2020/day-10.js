const fs = require('fs');
let input = fs.readFileSync('./inputs/day-10.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const { oneDiff, threeDiff } = input
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b)
    .reduce((differences, adapter) => {
      const d = adapter - differences.joltage;
      
      if (d === 1) {
        differences.oneDiff += 1;
      } else if (d === 3) {
        differences.threeDiff += 1;
      } else {
        throw new Error(`Joltage difference is not 1 or 3: ${d}`);
      }

      differences.joltage = adapter;

      return differences;
    }, { oneDiff: 0, threeDiff: 1, joltage: 0 });

  return oneDiff * threeDiff;
}

function partTwo(input) {
  const adapters = input.split('\n').map(Number).sort((a, b) => a - b);
  const cache = {};

  // Okay, so the path stuff isn't necessary but it might be useful someday.
  const arrange = (adapters, idx, paths, path) => {
    const key = `${idx}`;

    if (cache[key]) {
      return cache[key];
    }

    const curr = idx === -1 ? 0 : adapters[idx];
    const nextOne = adapters[idx + 1];
    const nextTwo = adapters[idx + 2];
    const nextThree = adapters[idx + 3];

    path.push(curr);

    if (idx === adapters.length - 1) {
      paths.push(path);
      return paths.length;
    }

    let count = 0;

    if ([1, 2, 3].includes(nextOne - curr)) {
      count += arrange(adapters, idx + 1, [...paths], [...path]);
    }

    if ([1, 2, 3].includes(nextTwo - curr)) {
      count += arrange(adapters, idx + 2, [...paths], [...path]);
    }

    if ([1, 2, 3].includes(nextThree - curr)) {
      count += arrange(adapters, idx + 3, [...paths], [...path]);
    }

    cache[key] = count;

    return count;
  };

  return arrange(adapters, -1, [], []);
}
