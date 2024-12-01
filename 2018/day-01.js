const fs = require('fs')
const input = fs.readFileSync('./inputs/day-01.txt', 'utf-8')
const frequencies = input.split('\n').map(i => +i)

// Part one
const answerPartOne = frequencies.reduce((sum, val) => sum + val, 0)
console.log('Answer part one:', answerPartOne)

// Part two
let answerFound = false
const uniqueFrequencies = new Set([0])
let prevFreq = 0

while (!answerFound) {
  prevFreq = frequencies.reduce((sum, val, index, array) => {
    const newSum = sum + val
    const originalLength = uniqueFrequencies.size

    uniqueFrequencies.add(newSum)
    if (uniqueFrequencies.size === originalLength) {
      answerFound = true
      console.log('Answer part two:', newSum)
      // Break out of reduce at this point in a non-orthodox manner 🙈
      array.splice(1)
    }

    return newSum
  }, prevFreq)
}
