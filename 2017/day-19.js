const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-19.txt', 'utf-8')

// Answers to the challenge 🤓
// EPYDUXANIT & 17543, which, after trying minus and plus 1, 17544 seems to be correct.
console.log(solvePartOneAndTwo(input))

function solvePartOneAndTwo(input) {
  const lines = input.split('\n')
  const chars = []
  let row = 0
  let col = lines[row].indexOf('|')
  let direction = 'd'
  let steps = 0
  let finished = false

  while (!finished) {

    if (direction === 'd') {
      const nextChar = lines[row+1][col]

      if (nextChar === '+') {
        direction = lines[row+1][col-1] === ' ' ? 'r' : 'l'
      } else if (nextChar !== '|' && nextChar !== '-') {
        chars.push(nextChar)
        finished = lines[row+2][col] === ' ' || !lines[row+2][col]
      }

      row +=1

    } else if (direction === 'r') {
      const nextChar = lines[row][col+1]

      if (nextChar === '+') {
        direction = lines[row-1][col+1] === ' ' ? 'd' : 'u'
      } else if (nextChar !== '|' && nextChar !== '-') {
        chars.push(nextChar)
        finished = lines[row][col+2] === ' ' || !lines[row][col+2]
      }

      col += 1

    } else if (direction === 'u') {
      const nextChar = lines[row-1][col]

      if (nextChar === '+') {
        direction = lines[row-1][col-1] === ' ' ? 'r' : 'l'
      } else if (nextChar !== '|' && nextChar !== '-') {
        chars.push(nextChar)
        finished = lines[row-2][col] === ' ' || !lines[row-2][col]
      }

      row -= 1

    } else if (direction === 'l') {
      const nextChar = lines[row][col-1]

      if (nextChar === '+') {
        direction = lines[row-1][col-1] === ' ' ? 'd' : 'u'
      } else if (nextChar !== '|' && nextChar !== '-') {
        chars.push(nextChar)
        finished = lines[row][col-1] === ' ' || !lines[row][col-1]
      }

      col -= 1
    }

    steps += 1
  }

  return { result: chars.join(''), steps }
}
