const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-08.txt', 'utf-8')

// Answers to the challenge 🤓
const instructions = parseInput(input)
const register = executeInstructions(instructions)

console.log(solvePartOne(register)) // [ 'nm', 5849 ]
console.log(solvePartTwo(register)) // 6702

function solvePartOne(register) {
  return Object.entries(register).reduce((max, value) => value[1] > max[1] && value[0] !== '__maxValue' ? value : max, [null, 0])
}

function solvePartTwo(register) {
  return register.__maxValue
}

function executeInstructions(instructions) {
  let maxValue = 0

  const register = instructions.reduce((register, instruction) => {
    // Initialize the register if it hasn't been done already
    register[instruction.conditionRegister] = register[instruction.conditionRegister] || 0
    register[instruction.register] = register[instruction.register] || 0

    // Take care of these "dec" and "inc" thingies
    const amount = instruction.operation === 'dec' ? -instruction.amount : instruction.amount

    switch (instruction.conditionOperator) {
      case '<':
        if (register[instruction.conditionRegister] < instruction.conditionAmount) {
          register[instruction.register] += amount
        }
        break

      case '>':
        if (register[instruction.conditionRegister] > instruction.conditionAmount) {
          register[instruction.register] += amount
        }
        break

      case '>=':
        if (register[instruction.conditionRegister] >= instruction.conditionAmount) {
          register[instruction.register] += amount
        }
        break

      case '<=':
        if (register[instruction.conditionRegister] <= instruction.conditionAmount) {
          register[instruction.register] += amount
        }
        break

      case '==':
        if (register[instruction.conditionRegister] == instruction.conditionAmount) {
          register[instruction.register] += amount
        }
        break

      case '!=':
        if (register[instruction.conditionRegister] !== instruction.conditionAmount) {
          register[instruction.register] += amount
        }
        break

      default:
        break
    }

    maxValue = register[instruction.register] > maxValue ? register[instruction.register] : maxValue

    return register
  }, {})

  register.__maxValue = maxValue

  return register
}

function parseInput(input) {
  return input.split('\n').map(i => {
    const parts = i.split(' ') // Oh, no regex this time 😔

    return {
      register: parts[0],
      operation: parts[1],
      amount: parseInt(parts[2]),
      conditionRegister: parts[4],
      conditionOperator: parts[5],
      conditionAmount: parseInt(parts[6]),
    }
  })
}
