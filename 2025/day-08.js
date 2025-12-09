import { readFileSync } from 'fs';

const input = readFileSync('2025/inputs/day-08.txt', 'utf-8');

const getDist = ([x1, y1, z1], [x2, y2, z2]) =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);

function partOne(sortedDistances) {
  let circuits = [];

  for (let ii = 0; ii < 1000; ii += 1) {
    const { posA, posB } = sortedDistances[ii];
    const a = posA.join(',');
    const b = posB.join(',');
    const matchingCircuits = circuits.filter((c) => c.has(a) || c.has(b));

    // No matching junction box found, create new circuit
    if (!matchingCircuits.length) {
      circuits.push(new Set([a, b]));
      continue;
    }

    // Junction box found in one matching circuit, add box to it
    if (matchingCircuits.length === 1) {
      matchingCircuits[0].add(a);
      matchingCircuits[0].add(b);
      continue;
    }

    // Merge circuits
    circuits = circuits.filter((c) => !(c.has(a) || c.has(b)));
    const newCircuit = new Set([...matchingCircuits[0].values(), ...matchingCircuits[1].values()]);
    circuits.push(newCircuit);
  }

  return circuits
    .sort((a, b) => b.size - a.size)
    .slice(0, 3)
    .reduce((product, circuit) => product * circuit.size, 1);
}

function partTwo(sortedDistances, size) {
  let circuits = [];

  for (let ii = 0; ii < sortedDistances.length; ii += 1) {
    const { posA, posB } = sortedDistances[ii];
    const a = posA.join(',');
    const b = posB.join(',');
    const matchingCircuits = circuits.filter((c) => c.has(a) || c.has(b));

    // No matching junction box found, create new circuit
    if (!matchingCircuits.length) {
      circuits.push(new Set([a, b]));
      continue;
    }

    // Junction box found in one matching circuit, add box to it
    if (matchingCircuits.length === 1) {
      matchingCircuits[0].add(a);
      matchingCircuits[0].add(b);

      if (circuits[0].size === size) {
        return posA[0] * posB[0];
      }

      continue;
    }

    // Merge circuits
    circuits = circuits.filter((c) => !(c.has(a) || c.has(b)));
    const newCircuit = new Set([...matchingCircuits[0].values(), ...matchingCircuits[1].values()]);
    circuits.push(newCircuit);
  }

  return 0;
}

const positions = input.split('\n').map((line) => line.split(',').map(Number));
const distances = [];

for (let ii = 0; ii < positions.length; ii += 1) {
  for (let jj = ii + 1; jj < positions.length; jj += 1) {
    const posA = positions[ii];
    const posB = positions[jj];
    const dist = getDist(posA, posB);
    distances.push({ dist, posA, posB });
  }
}

const sortedDistances = distances.toSorted((a, b) => a.dist - b.dist);

console.log(partOne(sortedDistances));
console.log(partTwo(sortedDistances, positions.length));
