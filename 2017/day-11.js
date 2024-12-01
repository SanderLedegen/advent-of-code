const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-11.txt', 'utf-8')

// Answers to the challenge 🤓
solvePartOneAndTwo(input) // 824 & 1548

function solvePartOneAndTwo(input) {
  const directions = input.split(',')
  const result = trace(directions)
  
  console.log(distance(0, 0, result.x, result.y))
  console.log(result.maxDistance)
}

function distance(x1, y1, x2, y2) {
  const deltaX = x1 - x2
  const deltaY = y1 - y2

  if (Math.sign(deltaX) === Math.sign(deltaY)) {
    return Math.max(Math.abs(deltaX), Math.abs(deltaY))
  } else {
    return Math.abs(deltaY - deltaX)
  }
}

function trace(directions) {
  /**
   * Using following coordinate system, we trace the route step by step to find the end point.
   *
   *         ^ 1
   *         |
   *         |
   * --------+-------->
   *         |        1
   *         |
   */

  let x = 0
  let y = 0
  let maxDistance = 0

  directions.forEach(d => {
    switch (d) {
      case 'nw':
        x -= 1
        break
      case 'n':
        y += 1
        break
      case 'ne':
        x += 1
        y += 1
        break
      case 'sw':
        x -= 1
        y -= 1
        break
      case 's':
        y -= 1
        break
      case 'se':
        x += 1
        break
      default:
        throw new Error(`Uh, what? An unknown direction ${d}? 🤔`)
    }

    const distanceFromCenter = distance(0, 0, x, y)
    maxDistance = distanceFromCenter > maxDistance ? distanceFromCenter : maxDistance
  })

  // Return the endpoint
  return { x, y, maxDistance }
}
