const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-12.txt', 'utf-8')

// Answers to the challenge 🤓
console.log(solvePartOne(input)) // 306
console.log(solvePartTwo(input)) // 200

function solvePartOne(input) {
  const programs = parseInput(input)
  return findConnectedPrograms(programs, 0).length
}

function solvePartTwo(input) {
  const programs = parseInput(input)
  const numOfPrograms = Object.keys(programs).length
  let numOfGroups = 0
  let programIds = []

  for (let ii = 1; ii < numOfPrograms; ii++) {
    if (!programIds.includes(ii)) {
      programIds = [...programIds, ...findConnectedPrograms(programs, ii)]
      numOfGroups += 1
    }
  }

  return numOfGroups
}

function findConnectedPrograms(programs, programId, group = []) {
  group.push(programId)

  programs[programId].forEach(p => {
    if (!group.includes(p)) {
      group = [...group, ...findConnectedPrograms(programs, p, group), p]
    }
  })

  // Get rid of duplicate program IDs
  return group.filter((value, ii) => group.indexOf(value) === ii)
}

function parseInput(input) {
  const rrrregex = /(\d+) <-> ([0-9, ]+)/

  return input.split('\n').reduce((map, line) => {
    const groups = line.split(rrrregex)
    map[+groups[1]] = groups[2].split(', ').map(i => +i)
    return map
  }, {})
}
