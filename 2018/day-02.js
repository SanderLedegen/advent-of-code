const fs = require('fs')
const input = fs.readFileSync('./inputs/day-02.txt', 'utf-8')
const boxIds = input.split('\n')

// Part one
const mapLetters = (boxId) => {
  return boxId.split('').reduce((map, character) => {
    map[character] = map[character] ? map[character] + 1 : 1
    return map
  }, {})
}

const countLetters = (map, num) => {
  return Object.values(map).find(v => v === num)
}

let numTwoTimes = 0
let numThreeTimes = 0

boxIds.forEach((boxId) => {
  const map = mapLetters(boxId)
  numTwoTimes += countLetters(map, 2) ? 1 : 0
  numThreeTimes += countLetters(map, 3) ? 1 : 0
})

const checksum = numTwoTimes * numThreeTimes

console.log('Answer part one:', checksum)

// Part two
const compareBoxIds = (a, b) => {
  const result = {
    differences: 0,
    matchingLetters: '',
  }

  for (let ii = 0; ii < a.length; ii += 1) {
    if (a[ii] !== b[ii]) {
      result.differences += 1
    } else {
      result.matchingLetters += a[ii]
    }
  }

  return result
}

let totalDifferences = Infinity
let commonLetters

for (let ii = 0; ii < boxIds.length - 1; ii += 1) {
  for (let jj = ii + 1; jj < boxIds.length; jj += 1) {
    const comparison = compareBoxIds(boxIds[ii], boxIds[jj])

    if (comparison.differences < totalDifferences) {
      totalDifferences = comparison.differences
      commonLetters = comparison.matchingLetters
    }
  }
}

console.log('Answer part two:', commonLetters)
