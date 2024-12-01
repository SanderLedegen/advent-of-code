// For performance reasons; needed for part two.
const cachedSumMap = {}

const calculatePowerLevel = (x, y, serialNumber) => {
  const rackId = x + 10
  return Math.floor(((rackId * y + serialNumber) * rackId) % 1000 / 100) - 5
}

const sumGridSquare = (grid, x, y, squareSize) => {
  let sum = 0

  for (let yy = y; yy < y + squareSize; yy += 1) {
    for (let xx = x; xx < x + squareSize; xx += 1) {
      sum += grid[yy][xx]
    }
  }

  return sum
}

const cachedSumGridSquare = (grid, x, y, squareSize) => {
  let sum = 0

  if (!cachedSumMap[`${x},${y}`]) {
    cachedSumMap[`${x},${y}`] = {}
  }

  if (squareSize > 1) {
    sum = cachedSumMap[`${x},${y}`][`${squareSize - 1}`]

    // Sum up the right border without the last element.
    for (let yy = y; yy < y + squareSize - 1; yy += 1) {
      sum += grid[yy][x + squareSize - 1]
    }

    // Sum up the bottom border without the last element.
    for (let xx = x; xx < x + squareSize - 1; xx += 1) {
      sum += grid[y + squareSize - 1][xx]
    }

    // Add the bottom-right element that was skipped until now.
    sum += grid[y + squareSize - 1][x + squareSize - 1]
  } else {
    for (let yy = y; yy < y + squareSize; yy += 1) {
      for (let xx = x; xx < x + squareSize; xx += 1) {
        sum += grid[yy][xx]
      }
    }
  }

  cachedSumMap[`${x},${y}`][`${squareSize}`] = sum

  return sum
}

const serialNumber = 3999
const GRID_SIZE = 300
const grid = new Array(GRID_SIZE).fill(0).map(() => new Array(GRID_SIZE).fill(0))

// Construct grid
for (let yy = 0; yy < GRID_SIZE; yy += 1) {
  for (let xx = 0; xx < GRID_SIZE; xx += 1) {
    grid[yy][xx] = calculatePowerLevel(xx, yy, serialNumber)
  }
}

// Find the most powerful 3x3 square in the grid.
let totalPowerLevel = -Infinity
let offset = null

for (let yy = 0; yy < GRID_SIZE - 3; yy += 1) {
  for (let xx = 0; xx < GRID_SIZE - 3; xx += 1) {
    const sum = sumGridSquare(grid, xx, yy, 3)
    if (sum > totalPowerLevel) {
      totalPowerLevel = sum
      offset = { x: xx, y: yy }
    }
  }
}

console.log(`The most powerful 3x3 square was found at ${offset.x},${offset.y} with a total power level of ${totalPowerLevel}.`)

console.log('Be patient for about 10 seconds to calculate part 2 😊\nA cached map of sums is being generated...')

// Find the most powerful nxn square in the grid.
totalPowerLevel = -Infinity
offset = null
for (let size = 1; size < GRID_SIZE; size += 1) {
  for (let yy = 0; yy < GRID_SIZE - size; yy += 1) {
    for (let xx = 0; xx < GRID_SIZE - size; xx += 1) {
      const result = cachedSumGridSquare(grid, xx, yy, size)
      if (result > totalPowerLevel) {
        totalPowerLevel = result
        offset = { x: xx, y: yy, size }
      }
    }
  }
}

console.log(`The most powerful nxn square was found at ${offset.x},${offset.y} with a total power level of ${totalPowerLevel} and a size of ${offset.size}.`)
