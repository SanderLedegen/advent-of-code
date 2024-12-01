const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-02.txt', 'utf-8')

// Answers to the challenge 🤓
console.log(solvePartOne(input)) // 30994
console.log(solvePartTwo(input)) // 233

function solvePartOne(input) {
  const rows = input.split('\n')

  return rows.reduce((sum, row) => {
    const split = row.split(/\s/)
    const max = Math.max(...split)
    const min = Math.min(...split)

    return sum + max - min
  }, 0)
}

function solvePartTwo(input) {
  const rows = input.split('\n')

  return rows.reduce((sum, row) => {
    const split = row.split(/\s/)

    for (let ii = 0; ii < split.length; ii++) {
      for (let jj = 0; jj < split.length; jj++) {
        if (ii === jj) {
          continue
        }

        const division = split[ii] / split[jj]

        if (division % 1 === 0) {
          return sum + division
        }
      }
    }

    throw new Error('Every row should contain two evenly divisible numbers according to the challenge; we shouldn\'t be here 😰')
  }, 0)
}
