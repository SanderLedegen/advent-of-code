const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-05.txt', 'utf-8')

// Answers to the challenge 🤓
console.log(solvePartOne(input)) // 373543
console.log(solvePartTwo(input)) // 27502966

function solvePartOne(input) {
  const instructions = input.split('\n').map(i => +i)
  let instructionPointer = 0
  let outOfBounds = false
  let steps = 0

  while (!outOfBounds) {
    const jump = +instructions[instructionPointer]
    instructions[instructionPointer] += 1
    instructionPointer += jump
    steps += 1

    outOfBounds = instructionPointer < 0 || instructionPointer >= instructions.length
  }

  return steps
}

function solvePartTwo(input) {
  const instructions = input.split('\n').map(i => +i)
  let instructionPointer = 0
  let outOfBounds = false
  let steps = 0

  while (!outOfBounds) {
    const jump = +instructions[instructionPointer]
    instructions[instructionPointer] += jump >= 3 ? -1 : 1
    instructionPointer += jump
    steps += 1

    outOfBounds = instructionPointer < 0 || instructionPointer >= instructions.length
  }

  return steps
}
