const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-13.txt', 'utf-8')

// Answers to the challenge 🤓
const scanners = parseInput(input)
console.log(solvePartOne(scanners)) // 1632
console.log(solvePartTwo(scanners)) // 3834136

function solvePartOne(scanners) {
  const maxSteps = Math.max(...Object.keys(scanners))
  let step = 0
  let severity = 0

  while (step <= maxSteps) {
    const range = scanners[step]

    if (range) {
      // I quote, "If there is a scanner at the top of the layer as your packet enters it, you are caught.""
      const caught = step % (2 * (range - 1)) === 0
      if (caught) {
        severity += step * range
      }
    }

    step += 1
  }

  return severity
}

function solvePartTwo(scanners) {
  const maxSteps = Math.max(...Object.keys(scanners))
  let delay = 0

  while (true) {
    let step = 0
    let wrongDelay = false

    while (step <= maxSteps) {
      const range = scanners[step]
  
      if (range) {
        const caught = (step + delay) % (2 * (range - 1)) === 0
        if (caught) {
          wrongDelay = true
          break
        }
      }
  
      step += 1
    }

    if (!wrongDelay) {
      return delay
    }

    delay += 1
  }
}

function parseInput(input) {
  return input.split('\n').reduce((map, line) => {
    const parts = line.split(': ').map(i => +i)
    map[parts[0]] = parts[1]
    return map
  }, {})
}
