const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-22.txt', 'utf-8')

const numOfIterationsPartOne = 10*1000
const numOfIterationsPartTwo = 10000000
const directions = 'urdl'

// Answers to the challenge 🤓
console.log(solvePartOne(parseInput(input, 100))) // 5240
console.log(solvePartTwo(parseInput(input, undefined, 2))) // 2512144

function solvePartOne(grid) {
  let direction = directions[0]
  let posX = Math.floor(grid.length / 2)
  let posY = Math.floor(grid.length / 2)
  let numOfNodesThatBecameInfected = 0

  for (let burst = 0; burst < numOfIterationsPartOne; burst++) {
    if (grid[posY][posX]) {
      // Turn right ➡️
      direction = directions[(directions.indexOf(direction) + 1) % directions.length]
    } else {
      // Turn left ⬅️
      direction = directions[(directions.indexOf(direction) - 1 + directions.length) % directions.length]
    }

    // A clean node becomes infected and vice versa
    grid[posY][posX] = +!grid[posY][posX]

    if (grid[posY][posX]) {
      numOfNodesThatBecameInfected += 1
    }

    // Moving forward in the newly-set direction
    posX += direction === 'l' ? -1 : direction === 'r' ? 1 : 0
    posY += direction === 'u' ? -1 : direction === 'd' ? 1 : 0
  }

  return numOfNodesThatBecameInfected
}

function solvePartTwo(grid) {
  /**
   * 0 = clean, 1 = weakened, 2 = infected, 3 = flagged.
   */
  
  let direction = directions[0]
  let posX = Math.floor(grid.length / 2)
  let posY = Math.floor(grid.length / 2)
  let numOfNodesThatBecameInfected = 0

  for (let burst = 0; burst < numOfIterationsPartTwo; burst++) {
    grid[posY][posX] = grid[posY][posX] || 0

    if (grid[posY][posX] === 2) {
      // Infected, turn right ➡️
      direction = directions[(directions.indexOf(direction) + 1) % directions.length]

    } else if (grid[posY][posX] === 0) {
      // Clean, turn left ⬅️
      direction = directions[(directions.indexOf(direction) - 1 + directions.length) % directions.length]

    } else if (grid[posY][posX] === 1) {
      // Weakened, don't do shit ⛔️

    } else if (grid[posY][posX] === 3) {
      // Flagged, reverse direction ↩️️
      direction = directions[(directions.indexOf(direction) - 2 + directions.length) % directions.length]
    }

    // Update node's status
    grid[posY][posX] = (grid[posY][posX] + 1) % 4

    if (grid[posY][posX] === 2) {
      numOfNodesThatBecameInfected += 1
    }

    // Moving forward in the newly-set direction
    posX += direction === 'l' ? -1 : direction === 'r' ? 1 : 0
    posY += direction === 'u' ? -1 : direction === 'd' ? 1 : 0
  }

  return numOfNodesThatBecameInfected
}

function parseInput(input, gridSize = 1000, infectedStatus = 1) {
  const grid = []

  for (let row = 0; row < gridSize; row++) {
    grid[row] = []
  }

  input.split('\n').forEach((line, rowIndex) => {
    const mapLength = line.length
    const y = Math.floor(gridSize / 2) - Math.floor(mapLength / 2) + rowIndex

    line.split('').forEach((value, colIndex) => {
      const x = Math.floor(gridSize / 2) - Math.floor(mapLength / 2) + colIndex
      grid[y][x] = value === '#' ? infectedStatus : 0
    })
  })

  return grid
}
