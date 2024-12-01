const fs = require('fs')
const input = fs.readFileSync('./inputs/day-01.txt', 'utf-8')

// --- Part one ---

const partOne = input
  .split('\n')
  .map(w => Math.floor(+w / 3) - 2)
  .reduce((sum, fuelRequired) => sum + fuelRequired, 0)

console.log(partOne)

// --- Part two ---

const partTwo = input
  .split('\n')
  .map(w => Math.floor(+w / 3) - 2)
  .reduce((sum, fuelRequired) => sum + fuelRequired + weightOfFuel(fuelRequired), 0)

function weightOfFuel(fuel, totalWeight = 0) {
  const weight = Math.floor(fuel / 3) - 2
  return weight > 0 ? weightOfFuel(weight, totalWeight + weight) : totalWeight
}

console.log(partTwo)
