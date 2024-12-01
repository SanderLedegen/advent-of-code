const fs = require('fs')
const input = fs.readFileSync('./inputs/day-03.txt', 'utf-8')

const [wireA, wireB] = input.split('\n').map(trace)

// Part one
const partOne = Object.keys(wireA)
  .filter(keyA => wireB[keyA])
  .map(c => {
    const [x, y] = c.split(',').map(Number)
    return Math.abs(x) + Math.abs(y)
  })
  .reduce((min, curr) => Math.min(curr, min), Infinity)

console.log(partOne)

// Part two
const intersectionStepsWireA = Object.entries(wireA).filter(([keyA]) => wireB[keyA])
const intersectionStepsWireB = Object.entries(wireB).filter(([keyB]) => wireA[keyB])

const partTwo = intersectionStepsWireA
  .map(([keyA, stepsWireA]) => {
    const [, stepsWireB] = intersectionStepsWireB.find(([keyB]) => keyB === keyA)
    return stepsWireA + stepsWireB
  })
  .reduce((min, curr) => Math.min(curr, min), Infinity)

console.log(partTwo)

function trace(line) {
  const path = {}
  let x = 0
  let y = 0
  let steps = 0

  line.split(',').forEach((l) => {
    const dir = l.substring(0, 1)
    const length = +l.substring(1)

    for (let ii = 0; ii < length; ii += 1) {
      switch (dir) {
        case 'R':
          x += 1
          break

        case 'L':
          x -= 1
          break

        case 'U':
          y += 1
          break

        case 'D':
          y -= 1
          break

        default:
          throw new Error(`Unknown direction ${dir}`)
      }

      steps += 1
      path[`${x},${y}`] = steps
    }
  })

  return path
}
