const fs = require('fs')
let input = fs.readFileSync('./inputs/day-25.txt', 'utf-8')

const constellations = []

const points = input.split('\n').map((line) => {
  const numbers = line.split(',').map(n => +n)

  return {
    x: numbers[0],
    y: numbers[1],
    z: numbers[2],
    w: numbers[3],
  }
})

const manhattanDistance = (pointA, pointB) => {
  return Math.abs(pointA.x - pointB.x) +
    Math.abs(pointA.y - pointB.y) +
    Math.abs(pointA.z - pointB.z) +
    Math.abs(pointA.w - pointB.w)
}

const isPartOfConstellation = (constellation, point) => constellation.some((p) => manhattanDistance(p, point) <= 3)

points.forEach((point) => {
  const nearbyConstellation = constellations.find((constellation) => isPartOfConstellation(constellation, point))

  if (nearbyConstellation) {
    nearbyConstellation.push(point)
  } else {
    constellations.push([point])
  }
})

// Try to merge constellations by naively checking every point in every constellation. As soon as a
// point can be merged, merge its whole constellation and start over again.
let mergeHappened

do {
  let keepSearching = true
  mergeHappened = false

  for (let ii = 0; ii < constellations.length && keepSearching; ii += 1) {
    const constellation = constellations[ii]

    for (let jj = 0; jj < constellation.length && keepSearching; jj += 1) {
      const p = constellation[jj]

      for (let kk = 0; kk < constellations.length && keepSearching; kk += 1) {
        const c = constellations[kk]

        if (c === constellation) {
          continue
        }

        const canMergeConstellation = isPartOfConstellation(c, p)
        if (canMergeConstellation) {
          // Merge...
          constellation.push(...c)

          // ...and remove duplicate.
          constellations.splice(kk, 1)

          keepSearching = false
          mergeHappened = true
        }
      }
    }
  }
} while (mergeHappened)

const answerPartOne = constellations.length
console.log(`Answer part one: ${answerPartOne}`)
