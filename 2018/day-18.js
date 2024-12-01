const fs = require('fs')
const input = fs.readFileSync('./inputs/day-17.txt', 'utf-8')

const GRID_SIZE = 50
let grid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(null))
let newGrid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(null))

input.split('\n').forEach((line, lineIndex) => {
  line.split('').forEach((char, index) => {
    grid[lineIndex][index] = char
  })
})

const getAdjacentAcres = (grid, x, y) => {
  const result = {
    open: 0,
    tree: 0,
    lumberyard: 0,
  }

  for (let yy = -1; yy <= 1; yy += 1) {
    for (let xx = -1; xx <= 1; xx += 1) {
      // Don't go off grid.
      if (y + yy < 0 || y + yy >= GRID_SIZE || x + xx < 0 || x + xx >= GRID_SIZE) {
        continue
      }

      // Don't evaluate the acre you're getting the adjacent acres for.
      if (yy === 0 && xx === 0) {
        continue
      }

      if (grid[y + yy][x + xx] === '.') {
        result.open += 1
      } else if (grid[y + yy][x + xx] === '|') {
        result.tree += 1
      } else if (grid[y + yy][x + xx] === '#') {
        result.lumberyard += 1
      }
    }
  }

  return result
}

const countTotalResourceValue = (grid) => {
  let numTrees = 0
  let numLumberyards = 0

  for (let yy = 0; yy < GRID_SIZE; yy += 1) {
    for (let xx = 0; xx < GRID_SIZE; xx += 1) {
      if (grid[yy][xx] === '|') {
        numTrees += 1
      }

      if (grid[yy][xx] === '#') {
        numLumberyards += 1
      }
    }
  }

  return numTrees * numLumberyards
}

const map = new Map()

for (let minute = 1; minute <= 1337; minute += 1) {
  for (let yy = 0; yy < GRID_SIZE; yy += 1) {
    for (let xx = 0; xx < GRID_SIZE; xx += 1) {
      const acre = grid[yy][xx]
      const result = getAdjacentAcres(grid, xx, yy)

      if (acre === '.') {
        newGrid[yy][xx] = result.tree >= 3 ? '|' : '.'
      } else if (acre === '|') {
        newGrid[yy][xx] = result.lumberyard >= 3 ? '#' : '|'
      } else if (acre === '#') {
        newGrid[yy][xx] = result.lumberyard >= 1 && result.tree >= 1 ? '#' : '.'
      } else {
        throw new Error(`Found something strange at position ${xx},${yy}: ${grid[yy][xx]}.`)
      }
    }
  }

  grid = newGrid
  newGrid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(null))

  if (minute === 10) {
    const answerPartOne = countTotalResourceValue(grid)
    console.log(`Answer part one: ${answerPartOne}`)
  }

  // Part two

  // This key should be something unique to every iteration of the grid. It is chosen arbitrarily
  // and I chose to fully concatenate the grid to be sure it is unique. This at the cost of
  // performance and memory usage, though.
  const key = grid.reduce((acc, g) => acc + g.join(''), '')

  if (!map.has(key)) {
    map.set(key, { minute, totalResourceValue: countTotalResourceValue(grid) })
  } else {
    const cycleDuration = minute - map.get(key).minute

    console.log(`Loop detected at minute ${minute}, found a similar grid previously at minute ${map.get(key).minute}.`)
    console.log(`Every ${cycleDuration} minutes, a cycle is completed and the grid looks the same again.`)

    const minuteEqualToBillionthMinute = 1e9 % cycleDuration + map.get(key).minute
    const answerPartTwo = map.get(Array.from(map.keys())[minuteEqualToBillionthMinute + 1]).totalResourceValue

    console.log(`Answer part two: ${answerPartTwo}`)

    return
  }
}
