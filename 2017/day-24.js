const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-24.txt', 'utf-8')

const components = parseInput(input)
const foundCombinations = []
findCombinations(components, [])

// Answers to the challenge 🤓
console.log(solvePartOne()) // 1859
console.log(solvePartTwo()) // 1799

function solvePartOne() {
  return foundCombinations.reduce((maxStrength, combination) => {
    return Math.max(calculateStrength(combination), maxStrength)
  }, -Infinity)
}

function solvePartTwo() {
  let combination = null
  let length = -Infinity

  foundCombinations.forEach(c => {
    if (c.length > length) {
      combination = c
      length = c.length
    } else if (c.length === length) {
      combination = calculateStrength(c) > calculateStrength(combination) ? c : combination
    }
  })

  return calculateStrength(combination)
}

function findCombinations(components, bridge) {
  const possibilities = findPossibilities(components, bridge)

  possibilities.forEach(p => {
    const componentsWithoutThisPossibility = components.filter(c => c !== p)

    const endType = getEndType(bridge)
    const q = endType !== p[0] ? [p[1], p[0]] : p

    findCombinations(componentsWithoutThisPossibility, [...bridge, q])
  })

  if (!possibilities.length) {
    foundCombinations.push(bridge)
  }
}

function getEndType(bridge) {
  return bridge.length ? bridge[bridge.length - 1][1] : 0
}

function findPossibilities(components, bridge) {
  const endType = getEndType(bridge)
  return components.filter(c => c[0] === endType || c[1] === endType)
}

function calculateStrength(bridge) {
  return bridge.reduce((sum, component) => sum + component[0] + component[1], 0)
}

function parseInput(input) {
  const regex = /^(\d+)\/(\d+)$/g

  return input.split('\n').map(pipe => {
    const parts = pipe.split(regex)

    return [
      +parts[1],
      +parts[2],
    ]
  })
}
