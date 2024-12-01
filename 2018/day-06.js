const fs = require('fs')
let input = fs.readFileSync('./inputs/day-06.txt', 'utf-8')

const calculateManhattanDistance = (x1, y1, x2, y2) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

const findClosestCoordinate = (x, y, coordinates) => {
  let minDistance = Infinity
  let closestCoord = null

  coordinates.forEach((coord) => {
    const distanceToCoord = calculateManhattanDistance(x, y, coord.x, coord.y)

    if (minDistance > distanceToCoord) {
      minDistance = distanceToCoord
      closestCoord = coord
    } else if (minDistance === distanceToCoord) {
      // There are multiple coordinates equally far.
      closestCoord = null
    }
  })

  return closestCoord
}

let highestX = -Infinity
let highestY = -Infinity

const coords = input
  .split('\n')
  .map((line, i) => {
    const split = line.split(', ')
    const x = +split[0]
    const y = +split[1]

    highestX = x > highestX ? x : highestX
    highestY = y > highestY ? y : highestY

    return {
      x,
      y,
      id: i + 1,
    }
  })

let grid = new Array(highestY + 1).fill(0).map(() => new Array(highestX + 1).fill(0))

coords.forEach(({ x, y, id }) => {
  grid[y][x] = id
})

for (let y = 0; y < grid.length; y += 1) {
  for (let x = 0; x < grid[y].length; x += 1) {
    const coord = findClosestCoordinate(x, y, coords)
    grid[y][x] = coord ? coord.id : null
  }
}

const coordIdsToIgnore = new Set();

for (let x = 0; x < grid[0].length; x += 1) {
  coordIdsToIgnore.add(grid[0][x])
  coordIdsToIgnore.add(grid[grid.length - 1][x])
}

for (let y = 0; y < grid.length; y += 1) {
  coordIdsToIgnore.add(grid[y][0])
  coordIdsToIgnore.add(grid[y][grid[y].length - 1])
}

const map = {}
for (let y = 0; y < grid.length; y += 1) {
  for (let x = 0; x < grid[y].length; x += 1) {
    if (coordIdsToIgnore.has(grid[y][x])) {
      continue
    }

    if (!map[grid[y][x]]) {
      map[grid[y][x]] = 0
    }

    map[grid[y][x]] += 1
  }
}

const answerPartOne = Math.max(...Object.values(map))
console.log('Answer part one:', answerPartOne)

// Part two
const MAX_ALLOWED_DISTANCE = 10000

const validLocations = new Set()

for (let y = 0; y < grid.length; y += 1) {
  for (let x = 0; x < grid[y].length; x += 1) {
    const totalDistance = coords.reduce((sum, coord) => sum += calculateManhattanDistance(x, y, coord.x, coord.y), 0)

    if (totalDistance < MAX_ALLOWED_DISTANCE) {
      validLocations.add(`${x},${y}`)
    }
  }
}

const answerPartTwo = validLocations.size
console.log('Answer part two:', answerPartTwo)
