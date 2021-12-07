const fs = require('fs');
const input = fs.readFileSync('./inputs/day-07.txt', 'utf-8');

const median = (values) => {
  const sorted = values.sort((a, b) => a - b);
  if (values.length % 2 === 0) {
    return (sorted[values.length / 2 - 1] + sorted[values.length / 2]) / 2;
  } else {
    return sorted[Math.floor(values.length / 2)];
  }
};

const findLowestFuelCost = (positions, calculateFuelCost) => {
  const m = median(positions);
  const range = Math.floor(positions.length / 4);

  let fuelCost = calculateFuelCost(positions, m);

  for (let ii = 1; ii <= range; ii += 1) {
    const left = calculateFuelCost(positions, m - ii);
    const right = calculateFuelCost(positions, m + ii);
    fuelCost = Math.min(right, left, fuelCost);
  }

  return fuelCost;
};

const positions = input.split(',').map(Number);

console.log(partOne(positions));
console.log(partTwo(positions));

function partOne(positions) {
  const calculateFuelCost = (positions, targetPos) => {
    let fuel = 0;

    for (let pos of positions) {
      fuel += Math.abs(pos - targetPos);
    }

    return fuel;
  };

  return findLowestFuelCost(positions, calculateFuelCost);
}

function partTwo(positions) {
  const calculateFuelCost = (positions, targetPos) => {
    let fuel = 0;

    for (let pos of positions) {
      const d = Math.abs(pos - targetPos);
      fuel += (d * (d + 1)) / 2;
    }

    return fuel;
  };

  return findLowestFuelCost(positions, calculateFuelCost);
}
