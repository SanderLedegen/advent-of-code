const fs = require('fs')
const input = fs.readFileSync('./inputs/day-23.txt', 'utf-8')

let nanobotWithLargestRadius = null

const nanobots = input.split('\n').map((line) => {
  const groups = line.split(/pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/)
  const nanobot = {
    x: +groups[1],
    y: +groups[2],
    z: +groups[3],
    r: +groups[4],
  }

  if (nanobotWithLargestRadius === null || nanobot.r > nanobotWithLargestRadius.r) {
    nanobotWithLargestRadius = nanobot
  }

  return nanobot
})

const calculateManhattanDistance = (nanobotA, nanobotB) => {
  return Math.abs(nanobotA.x - nanobotB.x) +
    Math.abs(nanobotA.y - nanobotB.y) +
    Math.abs(nanobotA.z - nanobotB.z)
}

const answerPartOne = nanobots.reduce((numInRange, nanobot) => {
  const inRange = calculateManhattanDistance(nanobotWithLargestRadius, nanobot) <= nanobotWithLargestRadius.r
  numInRange += inRange ? 1 : 0
  return numInRange
}, 0)

console.log(`Answer part one: ${answerPartOne}`)
