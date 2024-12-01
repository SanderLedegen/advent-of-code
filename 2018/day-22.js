const fs = require('fs')
const input = fs.readFileSync('./inputs/day-22.txt', 'utf-8')
const lines = input.split('\n')

const depth = +lines[0].substring(7)
const target = {
  x: +lines[1].substring(8).split(',')[0],
  y: +lines[1].substring(8).split(',')[1],
}

const cachedGI = new Map()

const calculateGeologicIndex = (x, y, target) => {
  if (x === 0 && y === 0) {
    return 0
  }

  if (x === target.x && y === target.y) {
    return 0
  }

  if (y === 0) {
    return x * 16807
  }

  if (x === 0) {
    return y * 48271
  }

  let result

  if (cachedGI.has(`${x},${y}`)) {
    result = cachedGI.get(`${x},${y}`)
  } else {
    const geoA = calculateGeologicIndex(x - 1, y, target)
    const geoB = calculateGeologicIndex(x, y - 1, target)
    result = calculateErosionLevel(geoA) * calculateErosionLevel(geoB)
    cachedGI.set(`${x},${y}`, result)
  }

  return result
}

const calculateErosionLevel = (geologicIndex) => {
  return (geologicIndex + depth) % 20183
}

const determineRiskLevel = (cave, target) => {
  let riskLevel = 0

  for (let yy = 0; yy < target.y + 1; yy += 1) {
    for (let xx = 0; xx < target.x + 1; xx += 1) {
      riskLevel += cave[yy][xx]
    }
  }

  return riskLevel
}

const CAVE_SIZE = Math.max(target.x, target.y) + 1

const cave = new Array(CAVE_SIZE).fill(null).map(() => new Array(CAVE_SIZE).fill(null))

for (let yy = 0; yy < CAVE_SIZE; yy += 1) {
  for (let xx = 0; xx < CAVE_SIZE; xx += 1) {
    const geologicIndex = calculateGeologicIndex(xx, yy, target)
    const erosionLevel = calculateErosionLevel(geologicIndex) % 3
    cave[yy][xx] = erosionLevel
  }
}

const answerPartOne = determineRiskLevel(cave, target)
console.log(`Answer part one: ${answerPartOne}`)
