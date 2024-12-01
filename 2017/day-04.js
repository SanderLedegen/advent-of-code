const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-04.txt', 'utf-8')

// Answers to the challenge 🤓
console.log(solvePartOne(input)) // 451
console.log(solvePartTwo(input)) // 223

function solvePartOne(input) {
  const lines = input.split('\n')
  let numOfValidPassphrases = 0

  lines.forEach(line => {
    const words = line.split(' ')
    const set = new Set(words)

    if (set.size === words.length) {
      numOfValidPassphrases += 1
    }
  })

  return numOfValidPassphrases
}

function solvePartTwo(input) {
  const lines = input.split('\n')
  let numOfValidPassphrases = 0

  lines.forEach(line => {
    const words = line.split(' ')
    let validLine = true
    
    for (let ii = 0; ii < words.length && validLine; ii++) {
      for (let jj = 0; jj < words.length && validLine; jj++) {
        if (ii === jj) {
          continue
        }

        if (isAnagram(words[ii], words[jj])) {
          validLine = false
        }
      }
    }

    if (validLine) {
      numOfValidPassphrases += 1
    }
  })

  return numOfValidPassphrases
}

function isAnagram(a, b) {
  if (a.length !== b.length) {
    return false
  }

  return [...a].sort().join() === [...b].sort().join()
}
